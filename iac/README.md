# Translate Docs - Infrastructure as Code

This directory contains the Terraform infrastructure code for the Translate Docs application, following AWS best practices and a modular architecture.

## 📁 Project Structure

```
iac/
├── envs/                    # Environment-specific configurations
│   ├── stag/               # Staging environment
│   │   ├── main.tf         # Main configuration
│   │   ├── variables.tf    # Variable definitions
│   │   ├── outputs.tf      # Output definitions
│   │   ├── terraform.tfvars # Variable values
│   │   └── user-data/      # EC2 user data scripts
│   └── prod/               # Production environment
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       ├── terraform.tfvars
│       └── user-data/
├── modules/                 # Reusable Terraform modules
│   ├── vpc/                # VPC module
│   ├── security-groups/    # Security groups module
│   ├── ec2/                # EC2 instances module
│   └── alb/                # Application Load Balancer module
└── global/                  # Global resources (S3, DynamoDB)
    ├── main.tf
    ├── variables.tf
    ├── outputs.tf
    └── terraform.tfvars
```

## 🏗️ Architecture

The infrastructure implements a typical 3-tier architecture on AWS:

- **Region**: ap-southeast-1 (Singapore)
- **VPC**: Custom VPC with public and private subnets
- **Frontend**: EC2 instances in public subnets behind an Application Load Balancer
- **Backend**: EC2 instances in private subnets
- **Networking**: Internet Gateway for public access, NAT Gateway for private subnet internet access

### Components

1. **VPC Module**: Creates VPC, subnets, route tables, Internet Gateway, and NAT Gateway
2. **Security Groups Module**: Manages security groups for ALB, frontend, backend, and database
3. **EC2 Module**: Creates EC2 instances or Auto Scaling Groups with IAM roles
4. **ALB Module**: Creates Application Load Balancer with target groups and listeners
5. **Global Resources**: S3 bucket for Terraform state and DynamoDB for state locking

## 🚀 Getting Started

### Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) >= 1.5.0
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- SSH key pair for EC2 access

### Step 1: Setup Global Resources

First, create the S3 bucket and DynamoDB table for Terraform state management:

```bash
cd global
terraform init
terraform plan
terraform apply
```

**Note**: After creating global resources, you can comment out or remove the `backend` block in environment configurations until ready to migrate state.

### Step 2: Configure Environment Variables

Update the `terraform.tfvars` file in your target environment directory (stag or prod):

```bash
cd envs/stag  # or envs/prod
cp terraform.tfvars terraform.tfvars.local
```

Edit `terraform.tfvars` with your specific values:
- AWS region
- Network CIDR blocks
- Instance types
- SSH key name
- Certificate ARN (for HTTPS)
- Allowed SSH CIDR blocks

### Step 3: Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Review the execution plan
terraform plan

# Apply the configuration
terraform apply
```

### Step 4: Access Your Application

After deployment, get the ALB DNS name:

```bash
terraform output frontend_alb_dns_name
```

Access your application at:
- HTTP: `http://<alb-dns-name>`
- HTTPS: `https://<alb-dns-name>` (if SSL is configured)

## 🔧 Common Operations

### Deploying to Staging

```bash
cd envs/stag
make init
make plan
make apply
```

### Deploying to Production

```bash
cd envs/prod
make init
make plan
make apply
```

### Viewing Outputs

```bash
terraform output
```

### Destroying Infrastructure

```bash
terraform destroy
```

## 📝 Environment Differences

### Staging
- Single availability zone (ap-southeast-1a)
- Smaller instance types (t3.small)
- Single instances (no Auto Scaling)
- No deletion protection
- HTTP only (optional HTTPS)

### Production
- Multiple availability zones (ap-southeast-1a, ap-southeast-1b)
- Larger instance types (t3.medium)
- Auto Scaling Groups (2-4 instances)
- Deletion protection enabled
- HTTPS enforced with SSL certificate
- Enhanced monitoring enabled

## 🔐 Security Best Practices

1. **State Management**: Terraform state is stored in S3 with encryption and versioning
2. **State Locking**: DynamoDB table prevents concurrent modifications
3. **Network Isolation**: Backend servers in private subnets
4. **Security Groups**: Principle of least privilege
5. **IAM Roles**: EC2 instances use IAM roles instead of access keys
6. **Encryption**: EBS volumes encrypted by default
7. **Metadata Service**: IMDSv2 enforced

## 📊 Modules Documentation

### VPC Module
Creates a complete VPC setup with public and private subnets, Internet Gateway, NAT Gateway, and route tables.

**Inputs**:
- `vpc_cidr`: VPC CIDR block
- `public_subnet_cidrs`: List of public subnet CIDRs
- `private_subnet_cidrs`: List of private subnet CIDRs
- `availability_zones`: List of AZs

**Outputs**:
- `vpc_id`: VPC ID
- `public_subnet_ids`: Public subnet IDs
- `private_subnet_ids`: Private subnet IDs

### Security Groups Module
Manages security groups for different application tiers.

**Inputs**:
- `vpc_id`: VPC ID
- `frontend_app_port`: Frontend application port
- `backend_app_port`: Backend application port
- `ssh_allowed_cidr_blocks`: CIDRs allowed for SSH

**Outputs**:
- `frontend_alb_sg_id`: Frontend ALB security group ID
- `frontend_sg_id`: Frontend security group ID
- `backend_sg_id`: Backend security group ID

### EC2 Module
Creates EC2 instances or Auto Scaling Groups with launch templates.

**Inputs**:
- `instance_type`: EC2 instance type
- `subnet_ids`: Subnet IDs for instances
- `security_group_ids`: Security group IDs
- `create_asg`: Whether to create Auto Scaling Group
- `user_data`: User data script

**Outputs**:
- `instance_id`: Instance ID (if single instance)
- `autoscaling_group_id`: ASG ID (if ASG created)
- `iam_role_arn`: IAM role ARN

### ALB Module
Creates Application Load Balancer with target groups and listeners.

**Inputs**:
- `subnet_ids`: Subnet IDs for ALB
- `security_group_ids`: Security group IDs
- `target_port`: Target port for traffic
- `enable_https`: Enable HTTPS listener
- `certificate_arn`: SSL certificate ARN

**Outputs**:
- `alb_dns_name`: ALB DNS name
- `target_group_arn`: Target group ARN

## 🛠️ Troubleshooting

### State Lock Issues
If Terraform state is locked:
```bash
# Force unlock (use with caution)
terraform force-unlock <lock-id>
```

### EC2 Connection Issues
1. Verify security group rules allow SSH from your IP
2. Check key pair name matches your configuration
3. Ensure instances have public IP (for public subnets)
4. Use Systems Manager Session Manager as alternative

### Module Not Found
```bash
# Reinitialize Terraform
terraform init -upgrade
```

## 📚 Additional Resources

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes in the appropriate module or environment
3. Test in staging environment first
4. Submit pull request with detailed description

## 📄 License

This infrastructure code is part of the Translate Docs project.
