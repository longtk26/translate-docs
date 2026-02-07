# Makefile for Terraform operations
# Usage: make <target> ENV=<stag|prod>

.PHONY: help init plan apply destroy output validate format clean

# Default environment
ENV ?= stag

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)Translate Docs Infrastructure - Terraform Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Usage:$(NC)"
	@echo "  make <target> ENV=<stag|prod>"
	@echo ""
	@echo "$(GREEN)Available targets:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(GREEN)Available environments:$(NC)"
	@echo "  $(YELLOW)stag$(NC) - Staging environment"
	@echo "  $(YELLOW)prod$(NC) - Production environment"
	@echo ""
	@echo "$(GREEN)Examples:$(NC)"
	@echo "  make init ENV=stag"
	@echo "  make plan ENV=prod"
	@echo "  make apply ENV=stag"

init: ## Initialize Terraform
	@echo "$(BLUE)Initializing Terraform for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform init

plan: ## Show execution plan
	@echo "$(BLUE)Planning infrastructure changes for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform plan

apply: ## Apply infrastructure changes
	@echo "$(YELLOW)Applying infrastructure changes for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform apply

apply-auto: ## Apply infrastructure changes without confirmation
	@echo "$(YELLOW)Auto-applying infrastructure changes for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform apply -auto-approve

destroy: ## Destroy infrastructure
	@echo "$(RED)Destroying infrastructure for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform destroy

destroy-auto: ## Destroy infrastructure without confirmation
	@echo "$(RED)Auto-destroying infrastructure for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform destroy -auto-approve

output: ## Show outputs
	@echo "$(BLUE)Showing outputs for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform output

validate: ## Validate configuration
	@echo "$(BLUE)Validating Terraform configuration for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform validate

format: ## Format all Terraform files
	@echo "$(BLUE)Formatting Terraform files...$(NC)"
	terraform fmt -recursive .

format-check: ## Check if files are formatted
	@echo "$(BLUE)Checking Terraform file formatting...$(NC)"
	terraform fmt -recursive -check .

clean: ## Clean Terraform cache
	@echo "$(YELLOW)Cleaning Terraform cache for $(ENV) environment...$(NC)"
	rm -rf envs/$(ENV)/.terraform
	rm -f envs/$(ENV)/.terraform.lock.hcl

clean-all: ## Clean all Terraform caches
	@echo "$(YELLOW)Cleaning all Terraform caches...$(NC)"
	find . -type d -name ".terraform" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name ".terraform.lock.hcl" -delete 2>/dev/null || true

graph: ## Generate dependency graph
	@echo "$(BLUE)Generating dependency graph for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform graph | dot -Tpng > graph.png

global-init: ## Initialize global resources
	@echo "$(BLUE)Initializing global resources...$(NC)"
	cd global && terraform init

global-plan: ## Plan global resources
	@echo "$(BLUE)Planning global resources...$(NC)"
	cd global && terraform plan

global-apply: ## Apply global resources
	@echo "$(YELLOW)Applying global resources...$(NC)"
	cd global && terraform apply

global-output: ## Show global outputs
	@echo "$(BLUE)Showing global outputs...$(NC)"
	cd global && terraform output

state-list: ## List resources in state
	@echo "$(BLUE)Listing resources in $(ENV) state...$(NC)"
	cd envs/$(ENV) && terraform state list

state-show: ## Show a specific resource (usage: make state-show ENV=stag RESOURCE=module.vpc.aws_vpc.main)
	@echo "$(BLUE)Showing resource: $(RESOURCE)$(NC)"
	cd envs/$(ENV) && terraform state show $(RESOURCE)

refresh: ## Refresh state
	@echo "$(BLUE)Refreshing state for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform refresh

unlock: ## Force unlock state (usage: make unlock ENV=stag LOCK_ID=<lock-id>)
	@echo "$(RED)Force unlocking state for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform force-unlock $(LOCK_ID)

cost-estimate: ## Estimate costs (requires Infracost)
	@echo "$(BLUE)Estimating costs for $(ENV) environment...$(NC)"
	cd envs/$(ENV) && terraform plan -out=tfplan.binary && \
	terraform show -json tfplan.binary > plan.json && \
	infracost breakdown --path plan.json

security-scan: ## Run security scan (requires tfsec)
	@echo "$(BLUE)Running security scan...$(NC)"
	tfsec .

lint: ## Lint Terraform files (requires tflint)
	@echo "$(BLUE)Linting Terraform files...$(NC)"
	tflint --recursive

docs: ## Generate module documentation (requires terraform-docs)
	@echo "$(BLUE)Generating module documentation...$(NC)"
	terraform-docs markdown table --output-file README.md modules/vpc
	terraform-docs markdown table --output-file README.md modules/ec2
	terraform-docs markdown table --output-file README.md modules/alb
	terraform-docs markdown table --output-file README.md modules/security-groups
