# ALB Module - Variables

variable "environment" {
  description = "Environment name (e.g., stag, prod)"
  type        = string
}

variable "name" {
  description = "Name identifier for the ALB"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where ALB will be created"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for the ALB"
  type        = list(string)
}

variable "security_group_ids" {
  description = "List of security group IDs for the ALB"
  type        = list(string)
}

variable "internal" {
  description = "Whether the load balancer is internal"
  type        = bool
  default     = false
}

variable "enable_deletion_protection" {
  description = "Enable deletion protection for the ALB"
  type        = bool
  default     = false
}

variable "access_logs_bucket" {
  description = "S3 bucket name for ALB access logs"
  type        = string
  default     = ""
}

variable "access_logs_prefix" {
  description = "S3 bucket prefix for ALB access logs"
  type        = string
  default     = "alb"
}

variable "target_port" {
  description = "Port on which targets receive traffic"
  type        = number
}

variable "target_protocol" {
  description = "Protocol to use for routing traffic to targets"
  type        = string
  default     = "HTTP"
}

variable "target_type" {
  description = "Type of target (instance, ip, lambda)"
  type        = string
  default     = "instance"
}

variable "health_check_path" {
  description = "Path for health check"
  type        = string
  default     = "/"
}

variable "health_check_interval" {
  description = "Interval between health checks (seconds)"
  type        = number
  default     = 30
}

variable "health_check_timeout" {
  description = "Timeout for health check (seconds)"
  type        = number
  default     = 5
}

variable "health_check_healthy_threshold" {
  description = "Number of consecutive health checks successes required"
  type        = number
  default     = 2
}

variable "health_check_unhealthy_threshold" {
  description = "Number of consecutive health check failures required"
  type        = number
  default     = 2
}

variable "health_check_matcher" {
  description = "HTTP codes to use when checking for a successful response"
  type        = string
  default     = "200"
}

variable "deregistration_delay" {
  description = "Time to wait before deregistering a target (seconds)"
  type        = number
  default     = 30
}

variable "enable_stickiness" {
  description = "Enable sticky sessions"
  type        = bool
  default     = false
}

variable "stickiness_duration" {
  description = "Duration of sticky session (seconds)"
  type        = number
  default     = 86400
}

variable "enable_https" {
  description = "Enable HTTPS listener"
  type        = bool
  default     = false
}

variable "certificate_arn" {
  description = "ARN of the SSL certificate"
  type        = string
  default     = ""
}

variable "ssl_policy" {
  description = "SSL policy for HTTPS listener"
  type        = string
  default     = "ELBSecurityPolicy-TLS-1-2-2017-01"
}

variable "additional_certificate_arns" {
  description = "List of additional certificate ARNs to attach to HTTPS listener"
  type        = list(string)
  default     = []
}

variable "listener_rules" {
  description = "List of listener rules"
  type = list(object({
    priority         = number
    action_type      = string
    target_group_arn = string
    conditions       = list(any)
  }))
  default = []
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}
