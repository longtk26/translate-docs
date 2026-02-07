# Global Resources - Outputs

output "terraform_state_bucket" {
  description = "Name of the Terraform state bucket"
  value       = aws_s3_bucket.terraform_state.id
}

output "terraform_state_bucket_arn" {
  description = "ARN of the Terraform state bucket"
  value       = aws_s3_bucket.terraform_state.arn
}

output "terraform_lock_table" {
  description = "Name of the Terraform lock table"
  value       = aws_dynamodb_table.terraform_locks.id
}

output "terraform_lock_table_arn" {
  description = "ARN of the Terraform lock table"
  value       = aws_dynamodb_table.terraform_locks.arn
}

output "assets_bucket" {
  description = "Name of the assets bucket"
  value       = aws_s3_bucket.assets.id
}

output "assets_bucket_arn" {
  description = "ARN of the assets bucket"
  value       = aws_s3_bucket.assets.arn
}
