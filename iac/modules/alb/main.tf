# ALB Module - Main Configuration

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "${var.environment}-${var.name}-alb"
  internal           = var.internal
  load_balancer_type = "application"
  security_groups    = var.security_group_ids
  subnets            = var.subnet_ids

  enable_deletion_protection       = var.enable_deletion_protection
  enable_http2                     = true
  enable_cross_zone_load_balancing = true

  dynamic "access_logs" {
    for_each = var.access_logs_bucket != "" ? [1] : []
    content {
      bucket  = var.access_logs_bucket
      prefix  = var.access_logs_prefix
      enabled = true
    }
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-${var.name}-alb"
    }
  )
}

# Target Group
resource "aws_lb_target_group" "main" {
  name_prefix = substr("${var.environment}-${var.name}", 0, 6)
  port        = var.target_port
  protocol    = var.target_protocol
  vpc_id      = var.vpc_id
  target_type = var.target_type

  health_check {
    enabled             = true
    healthy_threshold   = var.health_check_healthy_threshold
    interval            = var.health_check_interval
    matcher             = var.health_check_matcher
    path                = var.health_check_path
    port                = "traffic-port"
    protocol            = var.target_protocol
    timeout             = var.health_check_timeout
    unhealthy_threshold = var.health_check_unhealthy_threshold
  }

  deregistration_delay = var.deregistration_delay

  stickiness {
    type            = "lb_cookie"
    enabled         = var.enable_stickiness
    cookie_duration = var.stickiness_duration
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.environment}-${var.name}-tg"
    }
  )

  lifecycle {
    create_before_destroy = true
  }
}

# HTTP Listener (redirect to HTTPS)
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = var.enable_https ? "redirect" : "forward"

    dynamic "redirect" {
      for_each = var.enable_https ? [1] : []
      content {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }

    target_group_arn = var.enable_https ? null : aws_lb_target_group.main.arn
  }

  tags = var.common_tags
}

# HTTPS Listener
resource "aws_lb_listener" "https" {
  count             = var.enable_https ? 1 : 0
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = var.ssl_policy
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }

  tags = var.common_tags
}

# Additional SSL Certificates
resource "aws_lb_listener_certificate" "additional" {
  count           = var.enable_https ? length(var.additional_certificate_arns) : 0
  listener_arn    = aws_lb_listener.https[0].arn
  certificate_arn = var.additional_certificate_arns[count.index]
}

# Listener Rules (optional)
resource "aws_lb_listener_rule" "custom" {
  count        = length(var.listener_rules)
  listener_arn = var.enable_https ? aws_lb_listener.https[0].arn : aws_lb_listener.http.arn
  priority     = var.listener_rules[count.index].priority

  action {
    type             = var.listener_rules[count.index].action_type
    target_group_arn = var.listener_rules[count.index].target_group_arn
  }

  dynamic "condition" {
    for_each = var.listener_rules[count.index].conditions
    content {
      dynamic "path_pattern" {
        for_each = lookup(condition.value, "path_pattern", null) != null ? [condition.value.path_pattern] : []
        content {
          values = path_pattern.value
        }
      }

      dynamic "host_header" {
        for_each = lookup(condition.value, "host_header", null) != null ? [condition.value.host_header] : []
        content {
          values = host_header.value
        }
      }
    }
  }

  tags = var.common_tags
}
