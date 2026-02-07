#!/bin/bash
# Quick deployment script for Translate Docs infrastructure

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    if ! command -v terraform &> /dev/null; then
        print_error "Terraform is not installed. Please install Terraform >= 1.5.0"
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install AWS CLI"
        exit 1
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials are not configured. Please run 'aws configure'"
        exit 1
    fi
    
    print_success "All prerequisites met"
}

# Function to deploy global resources
deploy_global() {
    print_info "Deploying global resources (S3 bucket and DynamoDB table)..."
    cd global
    terraform init
    terraform plan -out=tfplan
    print_warning "Review the plan above. Press Enter to continue or Ctrl+C to cancel..."
    read
    terraform apply tfplan
    rm tfplan
    print_success "Global resources deployed successfully"
    cd ..
}

# Function to deploy environment
deploy_environment() {
    local env=$1
    print_info "Deploying $env environment..."
    
    cd envs/$env
    
    # Check if terraform.tfvars exists
    if [ ! -f terraform.tfvars ]; then
        print_error "terraform.tfvars not found in envs/$env/"
        print_info "Please create terraform.tfvars from terraform.tfvars.example"
        exit 1
    fi
    
    # Initialize Terraform
    print_info "Initializing Terraform..."
    terraform init
    
    # Validate configuration
    print_info "Validating configuration..."
    terraform validate
    
    # Plan
    print_info "Creating execution plan..."
    terraform plan -out=tfplan
    
    # Confirm before apply
    print_warning "Review the plan above. Type 'yes' to apply or anything else to cancel:"
    read confirm
    
    if [ "$confirm" = "yes" ]; then
        terraform apply tfplan
        rm tfplan
        print_success "$env environment deployed successfully"
        
        # Show outputs
        print_info "Infrastructure outputs:"
        terraform output
    else
        print_warning "Deployment cancelled"
        rm tfplan
    fi
    
    cd ../..
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [global|stag|prod]"
    echo ""
    echo "Commands:"
    echo "  global  - Deploy global resources (S3 bucket and DynamoDB table)"
    echo "  stag    - Deploy staging environment"
    echo "  prod    - Deploy production environment"
    echo ""
    echo "Examples:"
    echo "  $0 global    # Deploy global resources first"
    echo "  $0 stag      # Deploy staging environment"
    echo "  $0 prod      # Deploy production environment"
}

# Main script
main() {
    print_info "Translate Docs Infrastructure Deployment"
    echo ""
    
    check_prerequisites
    
    if [ $# -eq 0 ]; then
        show_usage
        exit 1
    fi
    
    case "$1" in
        global)
            deploy_global
            ;;
        stag|staging)
            deploy_environment "stag"
            ;;
        prod|production)
            deploy_environment "prod"
            ;;
        *)
            print_error "Invalid command: $1"
            show_usage
            exit 1
            ;;
    esac
    
    print_success "Deployment completed!"
}

# Run main function
main "$@"
