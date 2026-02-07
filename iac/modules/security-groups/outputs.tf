# Security Groups Module - Outputs

# output "frontend_alb_sg_id" {
#   description = "ID of the Frontend ALB security group"
#   value       = aws_security_group.frontend_alb.id
# }

output "frontend_sg_id" {
  description = "ID of the Frontend security group"
  value       = aws_security_group.frontend.id
}

output "backend_sg_id" {
  description = "ID of the Backend security group"
  value       = aws_security_group.backend.id
}

output "database_sg_id" {
  description = "ID of the Database security group"
  value       = var.create_database_sg ? aws_security_group.database[0].id : null
}
