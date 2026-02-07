# Global Resources - Variables

variable "aws_region" {
  description = "AWS region for global resources"
  type        = string
  default     = "ap-southeast-1"
}

variable "state_bucket_name" {
  description = "Name of the S3 bucket for Terraform state"
  type        = string
  default     = "translate-docs-terraform-state"
}

variable "lock_table_name" {
  description = "Name of the DynamoDB table for state locking"
  type        = string
  default     = "translate-docs-terraform-lock"
}

variable "assets_bucket_name" {
  description = "Name of the S3 bucket for application assets"
  type        = string
  default     = "translate-docs-assets"
}
