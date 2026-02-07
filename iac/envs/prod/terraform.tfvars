# Production Environment Configuration

# AWS Configuration
aws_region = "ap-southeast-1"

# Network Configuration
vpc_cidr             = "10.1.0.0/16"
public_subnet_cidrs  = ["10.1.1.0/24", "10.1.2.0/24"]
private_subnet_cidrs = ["10.1.101.0/24", "10.1.102.0/24"]
availability_zones   = ["ap-southeast-1a", "ap-southeast-1b"]
enable_nat_gateway   = true

# Security Configuration
ssh_allowed_cidr_blocks = [] # Add your IP addresses for SSH access
key_name                = "" # Add your SSH key pair name

# Frontend Configuration
frontend_instance_type        = "t3.medium"
frontend_app_port             = 3000
frontend_health_check_path    = "/"
frontend_root_volume_size     = 50
frontend_create_asg           = true
frontend_asg_min_size         = 2
frontend_asg_max_size         = 4
frontend_asg_desired_capacity = 2

# Backend Configuration
backend_instance_type        = "t3.medium"
backend_app_port             = 8000
backend_root_volume_size     = 50
backend_create_asg           = true
backend_asg_min_size         = 2
backend_asg_max_size         = 4
backend_asg_desired_capacity = 2

# Database Configuration
create_database_sg = true

# SSL/TLS Configuration
enable_https               = true
certificate_arn            = "" # Add your ACM certificate ARN for HTTPS
enable_deletion_protection = true
