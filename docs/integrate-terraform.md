# Journey of Terraform Integration
Hello there, this doc will show you the whole process of what I have done to integrate `Terraform` to deploy app on the `AWS cloud`.

## Initialize the environment
To utilize `Terraform` to build the infrastructure on AWS cloud, we need to initialize the enviroment of `Terraform CLI` and `AWS CLI`.
### 1. Create account on Terraform cloud
Access [Terraform](https://app.terraform.io/) to create an account. 
Then follow the [steps](https://app.terraform.io/app/getting-started/example) in `getting-started` to initialize the example resources.
### 2. Install `Terraform CLI` on local
Utilze `brew` to install `Terraform CLI`
```shell
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```
### 3. Configure API token on local `Terraform CLI`
In terminal, use the `terraform login` command to create an API token and configure your CLI to use it.
```shell
terraform login
```

Get the generated API token from `Terraform Cloud` and type into terminal to configure the `Terraform CLI`

### 4. Install AWS CLI
Follow the [instruction](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) to download and install `AWS CLI`.
```shell
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### 5. Initialize configuration of AWS CLI
#### Create a IAM user
Login AWS console and create a `user` on `Identity and Access Management (IAM)` on 
#### Get `Access keys`
Create an `Access keys` of the `user` and set the `Access Key ID` and `Secret Access Key` by using this command
```shell
aws configure
```

## Networking
To provide users with the ability to connect to the web application on the application server, we plan to create a `Virtual Private Cloud (VPC)`. This VPC will consist of two `Availability Zones (AZs)`, each containing a public `subnet` for running load balancers and private `subnets` for hosting application servers and databases.
|VPC|Public Subnet 1|Private Subnet 1|Private Subnet 2
|--|--|--|--|
|**AZ 1**|Load Balancer 1| Workout App (Frontend+Backend) 1|Mongo DB 1|
|**AZ 2**|Load Balancer 2| Workout App (Frontend+Backend) 2|Mongo DB 2|

### Virtual Private Cloud
Declare a VPC as `workout-app-vpc` with ip range `10.0.0.0/16`..
```terraform
resource "aws_vpc" "workout-app-vpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "Workout App VPC"
  }
}
```

### Subnets
Declare 2 different `availability zone` and each `az` has different ip range.
- ap-southeast-2a -> 10.0.10.0 ~ 10.0.19.0
- ap-southeast-2b -> 10.0.20.0 ~ 10.0.29.0
```terraform
# Declare AZ names
variable "az_list" {
  type    = list(string)
  default = ["ap-southeast-2a", "ap-southeast-2b"]
}
```
There are 6 subnet in total. (`1 public + 2 private` for each `AZ`)..
Each subnet has different ip range depending on roles.
|Roles|IP Range|
|--|--|
|Nginx Server|10.0.x1.0/24|
|App Server|10.0.x2.0/24|
|DB Server|10.0.x3.0/24|

```terraform
# Declare public subnet for nginx sercer
resource "aws_subnet" "public_subnet_lb" {
  count = 2

  vpc_id = aws_vpc.workout-app-vpc.id

  cidr_block = "10.0.${count.index + 1}1.0/24"

  availability_zone = "${var.az_list[count.index]}"

  # For public subnet
  map_public_ip_on_launch = true
  
  tags = {
    Name = "Load Balancer Public Subnet [${element(var.az_list, count.index)}]"
  }
}

# Declare private subnet for app server
resource "aws_subnet" "private_subnet_app" {
  count = 2

  vpc_id = aws_vpc.workout-app-vpc.id

  cidr_block = "10.0.${count.index + 1}2.0/24"

  availability_zone = "${var.az_list[count.index]}"

  # For private subnet
  map_public_ip_on_launch = false
  
  tags = {
    Name = "App Private Subnet [${var.az_list[count.index]}]"
  }
}

# Declare private subnet for database
resource "aws_subnet" "private_subnet_db" {
  count = 2

  vpc_id = aws_vpc.workout-app-vpc.id

  cidr_block = "10.0.${count.index + 1}3.0/24"

  availability_zone = "${var.az_list[count.index]}"

  # For private subnet
  map_public_ip_on_launch = false
  
  tags = {
    Name = "Database Private Subnet [${var.az_list[count.index]}]"
  }
}
```

### Public Access
To open public access for the application in the `Workout VPC`, set up `Internet Gateway` and `Route Table` to route all the requests.
#### Internet Gateway
Declare a `internet gateway` and attach it to the vpc.
```terraform
# Internet Gateway for the public subnet
resource "aws_internet_gateway" "tf-workout-igw" {
  tags = {
    Name = "tf-workout-igw"
  }
  vpc_id = aws_vpc.workout-app-vpc.id
}
```

#### Route
Delare a `Route Table` attached the `internet gateway` and associate the two public subnets with the `Route Table`.
```terraform
# Route table
resource "aws_route_table" "worout-web-access-rt" {
  vpc_id = aws_vpc.workout-app-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.tf-workout-igw.id
  }

  tags = {
    Name = "Web Access for Workout App"
  }
}

# Associate route table and subnet
resource "aws_route_table_association" "public-subnet-rta" {
  count = 2
  subnet_id = element(aws_subnet.public_subnet_lb, count.index).id
  route_table_id = aws_route_table.worout-web-access-rt.id
}
```
## EC2 Servers and Load Balancer comming soon!
---
## Happy Terraforming 😎!
