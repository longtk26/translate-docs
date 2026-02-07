# Deployment Guide

This guide provides step-by-step instructions for deploying the Translate Docs infrastructure.

## Prerequisites

Before you begin, ensure you have:

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Terraform** >= 1.5.0 installed
4. **SSH Key Pair** created in AWS (or create one during setup)

## Quick Start

### Option 1: Using the Deploy Script

The easiest way to deploy:

```bash
# 1. Deploy global resources first (only needed once)
./deploy.sh global

# 2. Configure your environment
cd envs/stag
cp terraform.tfvars terraform.tfvars.example
# Edit terraform.tfvars with your values

# 3. Deploy staging environment
cd ../..
./deploy.sh stag
```

### Option 2: Using Makefile

```bash
# Deploy global resources
make global-init
make global-plan
make global-apply

# Deploy staging environment
make init ENV=stag
make plan ENV=stag
make apply ENV=stag
```

### Option 3: Manual Terraform Commands

```bash
# Global resources
cd global
terraform init
terraform apply

# Staging environment
cd ../envs/stag
terraform init
terraform apply
```

## Detailed Deployment Steps

### Step 1: Clone and Navigate

```bash
cd /root/backend/projects/translate-docs/iac
```

### Step 2: Deploy Global Resources

Global resources include the S3 bucket for Terraform state and DynamoDB table for state locking.

```bash
cd global
terraform init
terraform plan
terraform apply
```

**Important**: Note the outputs - you'll need these values.

### Step 3: Configure Your Environment

#### For Staging:

```bash
cd ../envs/stag
```

Edit `terraform.tfvars` with your specific values:

```hcl
# Required values
aws_region              = "ap-southeast-1"
key_name                = "your-ssh-key-name"
ssh_allowed_cidr_blocks = ["YOUR_IP/32"]  # Your IP for SSH access

# Optional: Enable HTTPS
enable_https    = true
certificate_arn = "arn:aws:acm:region:account:certificate/xxx"
```

#### For Production:

```bash
cd ../envs/prod
```

Similar configuration but with production-appropriate values.

### Step 4: Initialize Terraform

```bash
terraform init
```

This will:
- Download required providers
- Configure the S3 backend for state storage

### Step 5: Plan the Deployment

```bash
terraform plan
```

Review the planned changes carefully. This will show you:
- VPC and networking resources
- Security groups
- EC2 instances or Auto Scaling Groups
- Application Load Balancer

### Step 6: Apply the Configuration

```bash
terraform apply
```

Type `yes` when prompted. This will take 5-10 minutes to complete.

### Step 7: Verify Deployment

```bash
# Get outputs
terraform output

# Access the application
terraform output frontend_alb_url
```

## Configuration Options

### SSH Access

To enable SSH access to your instances:

```hcl
ssh_allowed_cidr_blocks = ["1.2.3.4/32"]  # Your IP
key_name                = "my-key-pair"
```

### HTTPS Configuration

To enable HTTPS:

1. Request an SSL certificate in AWS Certificate Manager (ACM)
2. Update `terraform.tfvars`:

```hcl
enable_https    = true
certificate_arn = "arn:aws:acm:ap-southeast-1:123456789012:certificate/xxx"
```

### Auto Scaling

For production with auto scaling:

```hcl
frontend_create_asg          = true
frontend_asg_min_size        = 2
frontend_asg_max_size        = 4
frontend_asg_desired_capacity = 2
```

## Post-Deployment

### Accessing Your Application

1. Get the ALB DNS name:
   ```bash
   terraform output frontend_alb_dns_name
   ```

2. Access via browser:
   - HTTP: `http://your-alb-dns-name`
   - HTTPS: `https://your-alb-dns-name` (if configured)

### Connecting to EC2 Instances

#### Via SSH:
```bash
ssh -i /path/to/key.pem ec2-user@<instance-public-ip>
```

#### Via AWS Systems Manager (recommended):
```bash
aws ssm start-session --target <instance-id>
```

### Monitoring

View logs in CloudWatch:
```bash
aws logs tail /aws/ec2/frontend --follow
aws logs tail /aws/ec2/backend --follow
```

## Updating Infrastructure

### Updating Staging

```bash
cd envs/stag
terraform plan
terraform apply
```

### Updating Production

```bash
cd envs/prod
terraform plan
terraform apply
```

**Best Practice**: Always test changes in staging first!

## Destroying Infrastructure

### Destroy Staging

```bash
cd envs/stag
terraform destroy
```

### Destroy Production

```bash
cd envs/prod
terraform destroy
```

**Warning**: This will delete ALL resources including data!

### Destroy Global Resources (last step)

```bash
cd global
terraform destroy
```

## Troubleshooting

### State Lock Issues

If you encounter a state lock error:

```bash
# List locks
aws dynamodb scan --table-name translate-docs-terraform-lock

# Force unlock (use with caution)
terraform force-unlock <lock-id>
```

### Connection Timeout

If you can't connect to instances:

1. Check security group rules
2. Verify your IP is whitelisted
3. Ensure NAT Gateway is running (for private instances)
4. Check route tables

### Module Not Found

```bash
terraform init -upgrade
```

## Best Practices

1. **Always** deploy to staging first
2. **Review** terraform plan output before applying
3. **Use** version control for infrastructure code
4. **Enable** deletion protection in production
5. **Regular** backups of Terraform state
6. **Monitor** costs using AWS Cost Explorer
7. **Test** disaster recovery procedures

## Advanced Configuration

### Using Different AWS Profiles

```bash
export AWS_PROFILE=myprofile
terraform apply
```

### Backend Configuration

To use a different S3 bucket:

```hcl
terraform {
  backend "s3" {
    bucket = "my-custom-bucket"
    key    = "staging/terraform.tfstate"
    region = "ap-southeast-1"
  }
}
```

### Custom Instance Types

Modify `terraform.tfvars`:

```hcl
frontend_instance_type = "t3.medium"
backend_instance_type  = "t3.large"
```

## Support

For issues or questions:
1. Check the main README.md
2. Review module documentation
3. Check Terraform logs: `TF_LOG=DEBUG terraform apply`
4. Contact your infrastructure team

## Next Steps

After successful deployment:

1. Configure DNS (Route 53 or external)
2. Set up monitoring and alerting
3. Configure backup strategies
4. Implement CI/CD pipelines
5. Set up log aggregation
6. Configure WAF (if needed)
