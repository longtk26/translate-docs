# Security Groups Module - Main Configuration

# Frontend Security Group (Public - ALB)
# resource "aws_security_group" "frontend_alb" {
#   name_prefix = "${var.environment}-frontend-alb-"
#   description = "Security group for Frontend Application Load Balancer"
#   vpc_id      = var.vpc_id

#   ingress {
#     description = "HTTP from Internet"
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     description = "HTTPS from Internet"
#     from_port   = 443
#     to_port     = 443
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     description = "All outbound traffic"
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = merge(
#     var.common_tags,
#     {
#       Name = "${var.environment}-frontend-alb-sg"
#     }
#   )

#   lifecycle {
#     create_before_destroy = true
#   }
# }

# Frontend EC2 Security Group
resource "aws_security_group" "frontend" {
  name_prefix = "${var.environment}-frontend-"
  description = "Security group for Frontend EC2 instances"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP from ALB"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    # security_groups = [aws_security_group.frontend_alb.id]
  }

  ingress {
    description = "Application Port from ALB"
    from_port   = var.frontend_app_port
    to_port     = var.frontend_app_port
    protocol    = "tcp"
    # security_groups = [aws_security_group.frontend_alb.id]
  }

  ingress {
    description = "SSH from specific IPs"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_allowed_cidr_blocks
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-frontend-sg"
    }
  )

  lifecycle {
    create_before_destroy = true
  }
}

# Backend Security Group
resource "aws_security_group" "backend" {
  name_prefix = "${var.environment}-backend-"
  description = "Security group for Backend EC2 instances"
  vpc_id      = var.vpc_id

  ingress {
    description     = "API from Frontend"
    from_port       = var.backend_app_port
    to_port         = var.backend_app_port
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
  }

  ingress {
    description = "SSH from specific IPs"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_allowed_cidr_blocks
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-backend-sg"
    }
  )

  lifecycle {
    create_before_destroy = true
  }
}

# Database Security Group (if needed)
resource "aws_security_group" "database" {
  count       = var.create_database_sg ? 1 : 0
  name_prefix = "${var.environment}-database-"
  description = "Security group for Database"
  vpc_id      = var.vpc_id

  ingress {
    description     = "PostgreSQL from Backend"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.backend.id]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-database-sg"
    }
  )

  lifecycle {
    create_before_destroy = true
  }
}
