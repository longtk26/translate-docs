# EC2 Module - Outputs

# output "launch_template_id" {
#   description = "ID of the launch template"
#   value       = aws_launch_template.main.id
# }

# output "launch_template_arn" {
#   description = "ARN of the launch template"
#   value       = aws_launch_template.main.arn
# }

# output "autoscaling_group_id" {
#   description = "ID of the Auto Scaling Group"
#   value       = var.create_asg ? aws_autoscaling_group.main[0].id : null
# }

# output "autoscaling_group_arn" {
#   description = "ARN of the Auto Scaling Group"
#   value       = var.create_asg ? aws_autoscaling_group.main[0].arn : null
# }

output "instance_id" {
  description = "ID of the EC2 instance (if not using ASG)"
  value       = var.create_asg ? null : try(aws_instance.main[0].id, null)
}

output "instance_private_ip" {
  description = "Private IP of the EC2 instance (if not using ASG)"
  value       = var.create_asg ? null : try(aws_instance.main[0].private_ip, null)
}

output "instance_public_ip" {
  description = "Public IP of the EC2 instance (if not using ASG)"
  value       = var.create_asg ? null : try(aws_instance.main[0].public_ip, null)
}

output "iam_role_arn" {
  description = "ARN of the IAM role"
  value       = aws_iam_role.ec2.arn
}

output "iam_role_name" {
  description = "Name of the IAM role"
  value       = aws_iam_role.ec2.name
}

output "iam_instance_profile_arn" {
  description = "ARN of the IAM instance profile"
  value       = aws_iam_instance_profile.ec2.arn
}

output "key_pair_name" {
  description = "Name of the SSH key pair"
  value       = var.create_key_pair ? aws_key_pair.main[0].key_name : var.key_name
}
