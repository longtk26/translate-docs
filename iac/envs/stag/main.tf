# Staging Environment - Main Configuration

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = "staging"
      Project     = "translate-docs"
      ManagedBy   = "Terraform"
    }
  }
}

# Local variables
locals {
  environment = "stag"
  region      = var.aws_region
  common_tags = {
    Environment = "staging"
    Project     = "translate-docs"
    ManagedBy   = "Terraform"
  }
}

# VPC Module
module "vpc" {
  source = "../../modules/vpc"

  environment          = local.environment
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
  enable_nat_gateway   = var.enable_nat_gateway
  common_tags          = local.common_tags
}

# Security Groups Module
module "security_groups" {
  source = "../../modules/security-groups"

  environment             = local.environment
  vpc_id                  = module.vpc.vpc_id
  frontend_app_port       = var.frontend_app_port
  backend_app_port        = var.backend_app_port
  ssh_allowed_cidr_blocks = var.ssh_allowed_cidr_blocks
  create_database_sg      = var.create_database_sg
  common_tags             = local.common_tags
}


# Frontend EC2 Module
module "frontend" {
  source = "../../modules/ec2"

  environment        = local.environment
  name               = "frontend"
  instance_type      = var.frontend_instance_type
  subnet_ids         = module.vpc.public_subnet_ids
  security_group_ids = [module.security_groups.frontend_sg_id]
  key_name           = var.key_name
  user_data = templatefile("${path.module}/user-data/frontend.sh", {
    backend_url = "http://${module.backend.instance_private_ip}:${var.backend_app_port}"
  })
  root_volume_size = var.frontend_root_volume_size
  common_tags      = local.common_tags
}

# Backend EC2 Module
module "backend" {
  source = "../../modules/ec2"

  environment        = local.environment
  name               = "backend"
  instance_type      = var.backend_instance_type
  subnet_ids         = module.vpc.private_subnet_ids
  security_group_ids = [module.security_groups.backend_sg_id]
  key_name           = var.key_name
  user_data          = file("${path.module}/user-data/backend.sh")
  root_volume_size   = var.backend_root_volume_size
  common_tags        = local.common_tags
}

