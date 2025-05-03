# Hult Program Admin API

This project is a TypeScript-based Express API for managing executive education programs. It supports full CRUD operations, validation, and role-based access control, all powered by DynamoDB Local.

---

## 🚀 Features

- ✅ Get all programs
- ✅ Add new program
- ✅ Update program by ID
- ✅ Delete program by ID
- ✅ Validation and error handling
- ✅ Role-based access control (Admins & Marketing only)
- ✅ Unit tests for each route

---

## 🧱 Tech Stack

- TypeScript
- Express.js
- AWS SDK (DynamoDB Local)
- Jest + Supertest for testing
- Docker for running DynamoDB locally

---

## 📦 Installation & Setup

### 1. Open the folder

cd hult-program-api
npm install

### 2. Start DynamoDB Local (requires Docker)

docker compose up -d


> Ensure Docker Desktop is running before executing this.

### 3. Create the `Programs` table

aws dynamodb create-table ^
  --table-name Programs ^
  --attribute-definitions AttributeName=id,AttributeType=N ^
  --key-schema AttributeName=id,KeyType=HASH ^
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 ^
  --endpoint-url http://localhost:8000 ^
  --region us-east-1

### 4. Run the server

npm run dev

The API will be available at: [http://localhost:3000/api/programs](http://localhost:3000/api/programs)

---

## 🔐 Role-Based Access Control

To perform POST, PUT, or DELETE operations, include one of the following headers:

x-user-role: admin

or

x-user-role: marketing

---

## 📫 API Endpoints

| Method | Endpoint                | Description                | Protected? |
|--------|-------------------------|----------------------------|------------|
| GET    | `/api/programs`         | List all programs          | ❌ No      |
| POST   | `/api/programs`         | Add a new program          | ✅ Yes     |
| PUT    | `/api/programs/:id`     | Update a program           | ✅ Yes     |
| DELETE | `/api/programs/:id`     | Delete a program           | ✅ Yes     |

---

## 🧪 Run Unit Tests

npm run test


Test suite covers GET, POST, PUT, and DELETE operations using Jest and Supertest.

---

## 📄 Environment Variables

Your `.env` file should include:

PORT=3000
DYNAMODB_REGION=us-east-1
DYNAMODB_ENDPOINT=http://localhost:8000
TABLE_NAME=Programs


## 🙏 Thank You

Thank you for this opportunity to demonstrate my skills. I truly enjoyed working on this technical challenge and ensuring everything was built with care, scalability, and best practices in mind.

— Polimera Sai Jaisheel
