# A Project for Enhancing Development and Deployment Skills

Hello 🇦🇺 / 你好 🇹🇼, potential recruiters, teammates and employers. This repository serves as a record of my journey to improve my development and deployment skills after a career break. With four years of experience as a Java EE and ASP.NET web developer in Taiwan 🇹🇼, I've moved to Australia and developed a strong affinity for this remarkable place. My goal now is to enhance my skills to better fit future roles.

I'll be documenting my learning journey in this repository. Whether you're a recruiter, a potential teammate or employer, you'll find valuable insights about me here.

## Table of Contents

- [Target](#target)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)


## Target
*The goal is to create a practical, maintainable, and adaptable web application. Beginning with a basic CRUD app, it will evolve to encompass various essential functions like authorization, validation, file uploads, member systems, approval systems, notifications, and more. This project has no limits, as long as it contributes to enhancing my skillset.*

## Features

- [x] Basic CRUD app building.
- [x] Maintain complete git records
- [x] Practice Test-driven development while building back-end
- [x] Transfer Javascript to Typescript. Check this [Journey of Transferring](./docs/transfer-javascript-to-typescript.md)
- [ ] 🛠️ Integrate Terraform to manage server on cloud. Check this [Journey of Terraforming](./docs/integrate-terraform.md)
- [ ] Integrate Kubernetes to manage the docker
- [ ] Authorization and Data validation
- [ ] ...other essential functions

## Getting Started

To get started with this application, follow these steps:


1. Make your own `./backend/.env` refer to `./backend/.env.example`
2. Install package and lunch backend
```shell
cd backend/
npm i 
npm start 
```
3. Install package and lunch frontend
```shell
cd frontend/
npm i 
npm start 
```
4. Welcome! Hope you find valuable insights about me here. 🧸

## Usage
The program is organized into different modules:

```console
./
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── dtos/
│   ├── validators/
│   ├── models/
│   ├── test/
│   ├── jest.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── docs/
```
Each focusing on a specific duty. Each modules contains
##### Backend:
| Module | Description |
| --- | --- | 
| routes/ | Route URLs and controllers |
| controllers/ | HTTP requests and responses |
| services/ | Business logic |
| dtos/ | The media of transferring data throughout the program |
| validators/ | Various validators such as data of request from front-end |
| mongoose(package) | Access the data from database |
| models/ | Define the document of the database |
| test/ | Unit test |
| jest.config.js | Configuration of Node.js |
| package.json | Configuration of Node.js |
| tsconfig.json | Configuration of Typescript |
| .env | Confidential Configuration |
##### Frontend:
| Module | Description |
| --- | --- | 
| public/ | Static files of React |
| src/ | Source code of React |
| package.json | Configuration of Node.js |
| tsconfig.json | Configuration of Typescript |

---

Happy engineering!
