#!/bin/bash
# Frontend User Data Script

set -e

# Update system
yum update -y

# Install Node.js and npm
curl -sL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs


# Install Docker
yum install docker -y
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install CloudWatch agent
# wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
# rpm -U ./amazon-cloudwatch-agent.rpm

# Create application directory
# mkdir -p /opt/translate-docs/frontend
# cd /opt/translate-docs/frontend

# Environment configuration
# cat > /opt/translate-docs/frontend/.env << EOF
# VITE_API_URL=${backend_url}
# NODE_ENV=production
# PORT=3000
# EOF

# Configure CloudWatch agent
# cat > /opt/aws/amazon-cloudwatch-agent/etc/config.json << 'EOF'
# {
#   "logs": {
#     "logs_collected": {
#       "files": {
#         "collect_list": [
#           {
#             "file_path": "/var/log/messages",
#             "log_group_name": "/aws/ec2/frontend",
#             "log_stream_name": "{instance_id}/messages"
#           }
#         ]
#       }
#     }
#   }
# }
# EOF

# Start CloudWatch agent
# /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
#   -a fetch-config \
#   -m ec2 \
#   -s \
#   -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json

echo "Frontend instance initialized successfully"
