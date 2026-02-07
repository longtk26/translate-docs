# Security Groups Module - Variables

variable "environment" {
  description = "Environment name (e.g., stag, prod)"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where security groups will be created"
  type        = string
}

variable "frontend_app_port" {
  description = "Port on which frontend application runs"
  type        = number
  default     = 3000
}

variable "backend_app_port" {
  description = "Port on which backend application runs"
  type        = number
  default     = 8000
}

variable "ssh_allowed_cidr_blocks" {
  description = "CIDR blocks allowed to SSH into instances"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "create_database_sg" {
  description = "Whether to create database security group"
  type        = bool
  default     = false
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}
