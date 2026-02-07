# EC2 Module - Variables

variable "environment" {
  description = "Environment name (e.g., stag, prod)"
  type        = string
}

variable "name" {
  description = "Name of the EC2 resource (e.g., frontend, backend)"
  type        = string
}

variable "ami_id" {
  description = "AMI ID to use for the instance. If empty, will use latest Amazon Linux 2"
  type        = string
  default     = ""
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs where instances will be launched"
  type        = list(string)
}

variable "security_group_ids" {
  description = "List of security group IDs to attach to instances"
  type        = list(string)
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
  default     = ""
}

variable "create_key_pair" {
  description = "Whether to create a new key pair"
  type        = bool
  default     = false
}

variable "public_key" {
  description = "Public key for SSH access (required if create_key_pair is true)"
  type        = string
  default     = ""
}

variable "user_data" {
  description = "User data script to run on instance launch"
  type        = string
  default     = ""
}

variable "user_data_base64" {
  description = "Base64 encoded user data script"
  type        = string
  default     = ""
}

variable "root_volume_size" {
  description = "Size of the root volume in GB"
  type        = number
  default     = 30
}

variable "root_volume_type" {
  description = "Type of root volume"
  type        = string
  default     = "gp3"
}

variable "enable_detailed_monitoring" {
  description = "Enable detailed CloudWatch monitoring"
  type        = bool
  default     = false
}

variable "custom_iam_policy" {
  description = "Custom IAM policy JSON for the EC2 role"
  type        = string
  default     = ""
}

variable "create_asg" {
  description = "Whether to create an Auto Scaling Group"
  type        = bool
  default     = false
}

variable "asg_min_size" {
  description = "Minimum size of the Auto Scaling Group"
  type        = number
  default     = 1
}

variable "asg_max_size" {
  description = "Maximum size of the Auto Scaling Group"
  type        = number
  default     = 3
}

variable "asg_desired_capacity" {
  description = "Desired capacity of the Auto Scaling Group"
  type        = number
  default     = 1
}

variable "asg_health_check_type" {
  description = "Type of health check for ASG (EC2 or ELB)"
  type        = string
  default     = "EC2"
}

variable "asg_health_check_grace_period" {
  description = "Time in seconds after instance comes into service before checking health"
  type        = number
  default     = 300
}

variable "target_group_arns" {
  description = "List of target group ARNs for ASG"
  type        = list(string)
  default     = []
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}
