# Staging Environment - Outputs

# VPC Outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = module.vpc.private_subnet_ids
}

# Frontend Outputs
# output "frontend_alb_dns_name" {
#   description = "DNS name of the frontend ALB"
#   value       = module.frontend_alb.alb_dns_name
# }

# output "frontend_alb_url" {
#   description = "URL of the frontend ALB"
#   value       = var.enable_https ? "https://${module.frontend_alb.alb_dns_name}" : "http://${module.frontend_alb.alb_dns_name}"
# }

output "frontend_instance_id" {
  description = "ID of the frontend instance"
  value       = module.frontend.instance_id
}

# output "frontend_asg_id" {
#   description = "ID of the frontend Auto Scaling Group"
#   value       = module.frontend.autoscaling_group_id
# }

# Backend Outputs
output "backend_instance_id" {
  description = "ID of the backend instance"
  value       = module.backend.instance_id
}

output "backend_instance_private_ip" {
  description = "Private IP of the backend instance"
  value       = module.backend.instance_private_ip
}

# output "backend_asg_id" {
#   description = "ID of the backend Auto Scaling Group"
#   value       = module.backend.autoscaling_group_id
# }

# Security Group Outputs
output "frontend_sg_id" {
  description = "ID of the frontend security group"
  value       = module.security_groups.frontend_sg_id
}

output "backend_sg_id" {
  description = "ID of the backend security group"
  value       = module.security_groups.backend_sg_id
}
