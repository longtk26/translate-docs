# Staging Environment Configuration

# AWS Configuration
aws_region = "ap-southeast-1"

# Network Configuration
vpc_cidr             = "10.0.0.0/16"
public_subnet_cidrs  = ["10.0.1.0/24"]
private_subnet_cidrs = ["10.0.101.0/24"]
availability_zones   = ["ap-southeast-1a"]
enable_nat_gateway   = false

# Security Configuration
ssh_allowed_cidr_blocks = ["0.0.0.0/0"] # Add your IP addresses for SSH access
key_name                = ""            # Add your SSH key pair name

# Frontend Configuration
frontend_instance_type        = "t3.micro"
frontend_app_port             = 3000
frontend_health_check_path    = "/"
frontend_root_volume_size     = 30
frontend_create_asg           = false
frontend_asg_min_size         = 1
frontend_asg_max_size         = 2
frontend_asg_desired_capacity = 1

# Backend Configuration
backend_instance_type        = "t3.micro"
backend_app_port             = 8000
backend_root_volume_size     = 30
backend_create_asg           = false
backend_asg_min_size         = 1
backend_asg_max_size         = 2
backend_asg_desired_capacity = 1

# Database Configuration
create_database_sg = false

# SSL/TLS Configuration
enable_https    = false
certificate_arn = "" # Add your ACM certificate ARN for HTTPS
