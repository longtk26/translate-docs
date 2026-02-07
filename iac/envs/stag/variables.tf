# Staging Environment - Variables

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "ap-southeast-1"
}

# VPC Variables
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.101.0/24"]
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["ap-southeast-1a"]
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway for private subnets"
  type        = bool
  default     = false
}

# Security Variables
variable "ssh_allowed_cidr_blocks" {
  description = "CIDR blocks allowed for SSH access"
  type        = list(string)
  default     = []
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
  default     = ""
}

# Frontend Variables
variable "frontend_instance_type" {
  description = "Instance type for frontend"
  type        = string
  default     = "t3.micro"
}

variable "frontend_app_port" {
  description = "Port for frontend application"
  type        = number
  default     = 3000
}

variable "frontend_health_check_path" {
  description = "Health check path for frontend"
  type        = string
  default     = "/"
}

variable "frontend_root_volume_size" {
  description = "Root volume size for frontend instances (GB)"
  type        = number
  default     = 30
}

variable "frontend_create_asg" {
  description = "Create Auto Scaling Group for frontend"
  type        = bool
  default     = false
}

variable "frontend_asg_min_size" {
  description = "Minimum size of frontend ASG"
  type        = number
  default     = 1
}

variable "frontend_asg_max_size" {
  description = "Maximum size of frontend ASG"
  type        = number
  default     = 2
}

variable "frontend_asg_desired_capacity" {
  description = "Desired capacity of frontend ASG"
  type        = number
  default     = 1
}

# Backend Variables
variable "backend_instance_type" {
  description = "Instance type for backend"
  type        = string
  default     = "t3.micro"
}

variable "backend_app_port" {
  description = "Port for backend application"
  type        = number
  default     = 8000
}

variable "backend_root_volume_size" {
  description = "Root volume size for backend instances (GB)"
  type        = number
  default     = 30
}

variable "backend_create_asg" {
  description = "Create Auto Scaling Group for backend"
  type        = bool
  default     = false
}

variable "backend_asg_min_size" {
  description = "Minimum size of backend ASG"
  type        = number
  default     = 1
}

variable "backend_asg_max_size" {
  description = "Maximum size of backend ASG"
  type        = number
  default     = 2
}

variable "backend_asg_desired_capacity" {
  description = "Desired capacity of backend ASG"
  type        = number
  default     = 1
}

# Database Variables
variable "create_database_sg" {
  description = "Create database security group"
  type        = bool
  default     = false
}

# SSL/TLS Variables
variable "enable_https" {
  description = "Enable HTTPS on ALB"
  type        = bool
  default     = false
}

variable "certificate_arn" {
  description = "ARN of SSL certificate for HTTPS"
  type        = string
  default     = ""
}
