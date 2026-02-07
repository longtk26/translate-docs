# EC2 Module

This module creates EC2 instances with launch templates, IAM roles, and optional Auto Scaling Groups.

## Features

- EC2 instances with best practices
- Launch templates for consistent configuration
- IAM roles with SSM and CloudWatch access
- Optional Auto Scaling Groups
- EBS encryption enabled by default
- IMDSv2 enforced
- CloudWatch monitoring
- User data support

## Usage

```hcl
module "frontend" {
  source = "../../modules/ec2"

  environment        = "stag"
  name               = "frontend"
  instance_type      = "t3.small"
  subnet_ids         = module.vpc.public_subnet_ids
  security_group_ids = [module.security_groups.frontend_sg_id]
  key_name           = "my-key"
  user_data          = file("user-data/frontend.sh")
  
  create_asg           = true
  asg_min_size         = 1
  asg_max_size         = 3
  asg_desired_capacity = 2
  target_group_arns    = [module.alb.target_group_arn]
  
  common_tags = {
    Environment = "staging"
    Project     = "translate-docs"
  }
}
```

## Requirements

| Name      | Version  |
| --------- | -------- |
| terraform | >= 1.5.0 |
| aws       | ~> 5.0   |

## Inputs

| Name               | Description                             | Type           | Default | Required |
| ------------------ | --------------------------------------- | -------------- | ------- | :------: |
| environment        | Environment name                        | `string`       | n/a     |   yes    |
| name               | Name of the EC2 resource                | `string`       | n/a     |   yes    |
| instance_type      | EC2 instance type                       | `string`       | n/a     |   yes    |
| subnet_ids         | List of subnet IDs                      | `list(string)` | n/a     |   yes    |
| security_group_ids | List of security group IDs              | `list(string)` | n/a     |   yes    |
| create_asg         | Whether to create an Auto Scaling Group | `bool`         | `false` |    no    |
| asg_min_size       | Minimum size of ASG                     | `number`       | `1`     |    no    |
| asg_max_size       | Maximum size of ASG                     | `number`       | `3`     |    no    |

## Outputs

| Name                 | Description                               |
| -------------------- | ----------------------------------------- |
| launch_template_id   | ID of the launch template                 |
| autoscaling_group_id | ID of the Auto Scaling Group              |
| instance_id          | ID of the EC2 instance (if not using ASG) |
| iam_role_arn         | ARN of the IAM role                       |
