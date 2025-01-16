provider "aws" {
  region = "eu-central-1"  
}
terraform {
    required_providers {
        aws = {
        source  = "hashicorp/aws"
        version = "3.56.0"
        }
    }
}

resource "aws_security_group" "allow_http_ssh" {
  name        = "allow_http_ssh"
  description = "Allow HTTP and SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ebs_volume" "additional_storage" {
  availability_zone = aws_instance.web.availability_zone
  size              = 20  # Size in GB (Free Tier eligible up to 30 GB)
  type              = "gp2"  # General Purpose SSD (Free Tier eligible)
  tags = {
    Name = "Additional-Storage"
  }
}
resource "aws_volume_attachment" "attach_storage" {
  device_name = "/dev/xvdf"  # Device name to attach the volume
  volume_id   = aws_ebs_volume.additional_storage.id
  instance_id = aws_instance.web.id
  force_detach = true  # Ensures volume can be re-attached if needed
}

resource "aws_instance" "web" {
  ami           = "ami-0e54671bdf3c8ed8d"  # Amazon Linux 2 AMI
  instance_type = "t2.micro"

  security_groups        = [aws_security_group.allow_http_ssh.name]
  associate_public_ip_address = true

  user_data = <<-EOF
            #!/bin/bash
            yum update -y
            yum install docker -y

            touch /etc/docker/daemon.json
            echo '{
              "data-root": "/data/docker"
            }' > /etc/docker/daemon.json

            service docker start
            usermod -a -G docker ec2-user

            # Install docker-compose
            curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            chmod +x /usr/local/bin/docker-compose
            ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
            yum install libxcrypt-compat -y
                        
            #mount additional storage
            mkfs -t xfs /dev/xvdf
            mkdir /data
            mount /dev/xvdf /data
            
            cd /data

            # Clone your repository
            yum install git -y
            git clone https://github.com/IdKheh/LLMToolkitApplication.git /data/app

            # Build and run containers
            cd /data/app
            git checkout develop
            chmod +x start.sh
            sudo systemctl restart docker
            docker system prune -a
            # ./start.sh
            EOF

  tags = {
    Name = "Terraform-Frontend-Backend"
  }
}