# VPC Module

This module creates a complete VPC infrastructure with public and private subnets, Internet Gateway, NAT Gateway, and associated route tables.

## Features

- VPC with configurable CIDR block
- Public and private subnets across multiple availability zones
- Internet Gateway for public subnet internet access
- NAT Gateway for private subnet internet access
- Route tables with appropriate routes
- DNS support enabled
- Resource tagging

## Usage

```hcl
module "vpc" {
  source = "../../modules/vpc"

  environment          = "stag"
  vpc_cidr             = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24"]
  private_subnet_cidrs = ["10.0.101.0/24"]
  availability_zones   = ["ap-southeast-1a"]
  enable_nat_gateway   = true
  
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

| Name                 | Description                             | Type           | Default | Required |
| -------------------- | --------------------------------------- | -------------- | ------- | :------: |
| environment          | Environment name                        | `string`       | n/a     |   yes    |
| vpc_cidr             | CIDR block for VPC                      | `string`       | n/a     |   yes    |
| public_subnet_cidrs  | List of CIDR blocks for public subnets  | `list(string)` | n/a     |   yes    |
| private_subnet_cidrs | List of CIDR blocks for private subnets | `list(string)` | n/a     |   yes    |
| availability_zones   | List of availability zones              | `list(string)` | n/a     |   yes    |
| enable_nat_gateway   | Enable NAT Gateway for private subnets  | `bool`         | `true`  |    no    |
| common_tags          | Common tags to apply to all resources   | `map(string)`  | `{}`    |    no    |

## Outputs

| Name                    | Description                     |
| ----------------------- | ------------------------------- |
| vpc_id                  | ID of the VPC                   |
| vpc_cidr                | CIDR block of the VPC           |
| public_subnet_ids       | IDs of public subnets           |
| private_subnet_ids      | IDs of private subnets          |
| internet_gateway_id     | ID of the Internet Gateway      |
| nat_gateway_ids         | IDs of the NAT Gateways         |
| public_route_table_id   | ID of the public route table    |
| private_route_table_ids | IDs of the private route tables |
