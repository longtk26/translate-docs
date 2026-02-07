# EC2 Module - Main Configuration

# Get latest AMI
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Key Pair
resource "aws_key_pair" "main" {
  count      = var.create_key_pair ? 1 : 0
  key_name   = "${var.environment}-${var.name}-key"
  public_key = var.public_key

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-${var.name}-key"
    }
  )
}

# IAM Role for EC2
resource "aws_iam_role" "ec2" {
  name_prefix = "${var.environment}-${var.name}-"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-${var.name}-role"
    }
  )
}

# Attach SSM policy for Systems Manager
resource "aws_iam_role_policy_attachment" "ssm" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# Attach CloudWatch policy
# resource "aws_iam_role_policy_attachment" "cloudwatch" {
#   role       = aws_iam_role.ec2.name
#   policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
# }

# Custom IAM policy for S3 access (if needed)
# resource "aws_iam_role_policy" "custom" {
#   count = var.custom_iam_policy != "" ? 1 : 0
#   name  = "${var.environment}-${var.name}-custom-policy"
#   role  = aws_iam_role.ec2.id

#   policy = var.custom_iam_policy
# }

# IAM Instance Profile
resource "aws_iam_instance_profile" "ec2" {
  name_prefix = "${var.environment}-${var.name}-"
  role        = aws_iam_role.ec2.name

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-${var.name}-profile"
    }
  )
}

# Launch Template
# resource "aws_launch_template" "main" {
#   name_prefix   = "${var.environment}-${var.name}-"
#   image_id      = var.ami_id != "" ? var.ami_id : data.aws_ami.amazon_linux_2.id
#   instance_type = var.instance_type
#   key_name      = var.create_key_pair ? aws_key_pair.main[0].key_name : var.key_name

#   iam_instance_profile {
#     name = aws_iam_instance_profile.ec2.name
#   }

#   vpc_security_group_ids = var.security_group_ids

#   user_data = var.user_data_base64 != "" ? var.user_data_base64 : base64encode(var.user_data)

#   block_device_mappings {
#     device_name = "/dev/xvda"

#     ebs {
#       volume_size           = var.root_volume_size
#       volume_type           = var.root_volume_type
#       delete_on_termination = true
#       encrypted             = true
#     }
#   }

#   monitoring {
#     enabled = var.enable_detailed_monitoring
#   }

#   metadata_options {
#     http_endpoint               = "enabled"
#     http_tokens                 = "required"
#     http_put_response_hop_limit = 1
#   }

#   tag_specifications {
#     resource_type = "instance"

#     tags = merge(
#       var.common_tags,
#       {
#         Name = "${var.environment}-${var.name}"
#       }
#     )
#   }

#   tag_specifications {
#     resource_type = "volume"

#     tags = merge(
#       var.common_tags,
#       {
#         Name = "${var.environment}-${var.name}-volume"
#       }
#     )
#   }

#   tags = merge(
#     var.common_tags,
#     {
#       Name = "${var.environment}-${var.name}-lt"
#     }
#   )

#   lifecycle {
#     create_before_destroy = true
#   }
# }

# Auto Scaling Group
# resource "aws_autoscaling_group" "main" {
#   count                     = var.create_asg ? 1 : 0
#   name_prefix               = "${var.environment}-${var.name}-"
#   vpc_zone_identifier       = var.subnet_ids
#   min_size                  = var.asg_min_size
#   max_size                  = var.asg_max_size
#   desired_capacity          = var.asg_desired_capacity
#   health_check_type         = var.asg_health_check_type
#   health_check_grace_period = var.asg_health_check_grace_period

#   target_group_arns = var.target_group_arns

#   launch_template {
#     id      = aws_launch_template.main.id
#     version = "$Latest"
#   }

#   dynamic "tag" {
#     for_each = merge(
#       var.common_tags,
#       {
#         Name = "${var.environment}-${var.name}"
#       }
#     )

#     content {
#       key                 = tag.key
#       value               = tag.value
#       propagate_at_launch = true
#     }
#   }

#   lifecycle {
#     create_before_destroy = true
#   }
# }

# Single EC2 Instance (if not using ASG)
resource "aws_instance" "main" {
  count                  = var.create_asg ? 0 : 1
  ami                    = var.ami_id != "" ? var.ami_id : data.aws_ami.amazon_linux_2.id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_ids[0]
  vpc_security_group_ids = var.security_group_ids
  key_name               = var.create_key_pair ? aws_key_pair.main[0].key_name : var.key_name
  iam_instance_profile   = aws_iam_instance_profile.ec2.name
  user_data              = var.user_data_base64 != "" ? var.user_data_base64 : base64encode(var.user_data)

  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = var.root_volume_type
    delete_on_termination = true
    encrypted             = true
  }

  monitoring = var.enable_detailed_monitoring

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-${var.name}"
    }
  )

  lifecycle {
    ignore_changes = [ami]
  }
}
