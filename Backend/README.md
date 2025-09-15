# Taskify Backend API Documentation

This is the backend for Taskify, built with Node.js, Express, and MongoDB.  
It provides authentication routes for user signup, login, and password change.

## Getting Started

1. Install dependencies:
    ```sh
    npm install
    ```
2. Create a `.env` file (see sample in repo).
3. Start the server:
    ```sh
    npm run dev
    ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `DB_NAME`: Database name
- `PORT`: Server port
- `JWT_SECRET_KEY`: Secret for JWT
- `FRONTEND_URL`: Allowed frontend origin

---

## API Routes

Base URL: `/api/auth`

### 1. Signup

**Endpoint:**  
`POST /api/auth/signup`

**Request Body:**
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `201 Created`
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "user": {
        "id": "string",
        "fullName": "string",
        "email": "string"
      }
    }
    ```
- `400 Bad Request`
    ```json
    { "success": false, "message": "Provide all credentials" }
    ```
- `409 Conflict`
    ```json
    { "success": false, "message": "Email already exists" }
    ```
- `500 Internal Server Error`
    ```json
    { "success": false, "message": "Internal Server Error" }
    ```

---

### 2. Login

**Endpoint:**  
`POST /api/auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK`
    ```json
    {
      "success": true,
      "message": "Login successful",
      "user": {
        "id": "string",
        "fullName": "string",
        "email": "string"
      }
    }
    ```
- `400 Bad Request`
    ```json
    { "success": false, "message": "Provide all credentials" }
    ```
- `401 Unauthorized`
    ```json
    { "success": false, "message": "Email does not exist. Kindly signup" }
    ```
    or
    ```json
    { "success": false, "message": "Incorrect Password" }
    ```
- `500 Internal Server Error`
    ```json
    { "success": false, "message": "Internal Server Error" }
    ```

---

### 3. Change Password

**Endpoint:**  
`PUT /api/auth/changePassword`  
**Protected Route** (requires valid `accessToken` cookie)

**Request Body:**
```json
{
  "currPassword": "string",
  "updatedPassword": "string"
}
```

**Responses:**
- `201 Created`
    ```json
    { "success": true, "message": "Password updated successfully" }
    ```
- `401 Unauthorized`
    ```json
    { "success": false, "message": "User not found while changing passowrd" }
    ```
    or
    ```json
    { "success": false, "message": "Current password is required to change the password." }
    ```
    or
    ```json
    { "success": false, "message": "Current password is incorrect." }
    ```
- `400 Bad Request`
    ```json
    { "success": false, "message": "Provide password to update" }
    ```
- `500 Internal Server Error`
    ```json
    { "success": false, "message": "Internal server error" }
    ```

---

## Authentication

- On successful signup/login, an `accessToken` cookie is set (JWT, expires in 14 days).
- Protected routes require this cookie.

---

## Task API

All routes are protected and require authentication.

### Create Task

**POST /api/task**

**Body:**
```json
{
  "title": "string",
  "description": "string (optional)",
  "category": "string"
}
```
**Response:**
- `201 Created`
    ```json
    { "success": true, "task": { ...taskObject } }
    ```
- `400 Bad Request`
    ```json
    { "success": false, "message": "Title and category are required." }
    ```

---

### Get All Tasks

**GET /api/task**

**Response:**
- `200 OK`
    ```json
    { "success": true, "tasks": [ ... ] }
    ```

---

### Update Task

**PUT /api/task/:id**

**Body:** (any fields to update)
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "isDone": true
}
```
**Response:**
- `200 OK`
    ```json
    { "success": true, "task": { ...updatedTask } }
    ```
- `404 Not Found`
    ```json
    { "success": false, "message": "Task not found." }
    ```

---

### Delete Task

**DELETE /api/task/:id**

**Response:**
- `200 OK`
    ```json
    { "success": true, "message": "Task deleted." }
    ```
- `404 Not Found`
    ```json
    { "success": false, "message": "Task not found." }
    ```