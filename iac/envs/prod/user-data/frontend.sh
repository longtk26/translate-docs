#!/bin/bash
# Production Frontend User Data Script

set -e

# Update system
yum update -y

# Install Node.js and npm
curl -sL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm

# Create application directory
mkdir -p /opt/translate-docs/frontend
cd /opt/translate-docs/frontend

# Environment configuration
cat > /opt/translate-docs/frontend/.env << EOF
VITE_API_URL=${backend_url}
NODE_ENV=production
PORT=3000
EOF

# Configure CloudWatch agent with enhanced logging
cat > /opt/aws/amazon-cloudwatch-agent/etc/config.json << 'EOF'
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/messages",
            "log_group_name": "/aws/ec2/frontend-prod",
            "log_stream_name": "{instance_id}/messages"
          },
          {
            "file_path": "/opt/translate-docs/frontend/logs/*.log",
            "log_group_name": "/aws/ec2/frontend-prod",
            "log_stream_name": "{instance_id}/application"
          }
        ]
      }
    }
  },
  "metrics": {
    "namespace": "TranslateDocs/Frontend",
    "metrics_collected": {
      "cpu": {
        "measurement": [
          {
            "name": "cpu_usage_idle",
            "rename": "CPU_USAGE_IDLE",
            "unit": "Percent"
          }
        ],
        "metrics_collection_interval": 60
      },
      "mem": {
        "measurement": [
          {
            "name": "mem_used_percent",
            "rename": "MEM_USED_PERCENT",
            "unit": "Percent"
          }
        ],
        "metrics_collection_interval": 60
      }
    }
  }
}
EOF

# Start CloudWatch agent
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -s \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json

echo "Production frontend instance initialized successfully"
