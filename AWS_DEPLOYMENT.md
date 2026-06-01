# AWS Deployment Guide: WellnessOS (Day 40)

This guide satisfies the **Day 40: AWS Basics** requirement of the internship study plan, detailing how to deploy the Dockerized WellnessOS application to AWS using **EC2** (Elastic Compute Cloud) and **RDS** (Relational Database Service).

## 1. AWS RDS (Database Setup)
Instead of running a local database, Production uses AWS RDS.
1. Log into AWS Management Console and navigate to **RDS**.
2. Click **Create database** -> Choose **MySQL**.
3. Select **Free tier** template.
4. Set DB instance identifier: `wellnessos-prod-db`.
5. Master username: `root`, Master password: `aws_production_secure_pass_123`.
6. Public access: **No** (Security best practice; only EC2 should access it).
7. Create Database and copy the generated **Endpoint URL**.

## 2. AWS EC2 (Server Setup)
1. Navigate to **EC2** -> **Launch Instance**.
2. Select **Ubuntu Server 22.04 LTS**.
3. Instance type: `t2.micro` (Free tier eligible).
4. Configure Security Group:
   - Allow **SSH** (Port 22) from your IP.
   - Allow **Custom TCP** (Port 5000) from Anywhere (IPv4) for our Spring Boot app.
5. Launch the instance and download the `.pem` key.

## 3. Deployment Steps (via SSH)
Connect to your EC2 instance using the `.pem` file, then run the following setup commands to install Docker and run the app:

```bash
# Update server
sudo apt-get update -y

# Install Docker
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker ubuntu

# Pull your code from GitHub (Assuming it's pushed to a repo)
git clone https://github.com/yourusername/wellnessos-backend.git
cd wellnessos-backend

# Build the Docker image
docker build -t wellnessos-app .

# Run the Docker container, injecting the AWS RDS Endpoint
docker run -d -p 5000:5000 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://<YOUR_RDS_ENDPOINT_URL>:3306/altheal_prod_db?createDatabaseIfNotExist=true \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=aws_production_secure_pass_123 \
  --name wellnessos-backend wellnessos-app
```

## 4. Verification
Your secure Spring Boot Capstone Application is now live on AWS!
Test it by visiting:
`http://<YOUR_EC2_PUBLIC_IP>:5000/swagger-ui.html`
