# SamaleGPT API

## Overview

This API provides endpoints for generating chat content using the Gemini API, managing chat history, and handling user authentication, including user creation, login, and session management.

## Requirements

- Node.js
- MongoDB database (Cluster URL required)
- Gemini API Key
- JWT Secret Key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of backend the project with the following variables:

```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.2r43jvg.mongodb.net/samalegpt?retryWrites=true&w=majority&appName=Cluster0
GEMINI_API_KEY=your_api_key_here
JWT_SECRET=your_secret_key
```

- **MONGO_URI**: The MongoDB connection string. Replace `<username>` and `<password>` with your MongoDB credentials.
- **GEMINI_API_KEY**: Your API key for the Gemini service.
- **JWT_SECRET**: A secret key for signing JWT tokens. This key is required for session management.

### 4. Start the Server

## Backend 

```bash
npm run dev
```

## Frontend

```bash
npm start
```

The server should start running on the defined port (default: 8080).

## API Endpoints

### Chat Endpoints

#### 1. Generate Chat Content

- **URL**: `chat/generateContent/:chatId`
- **Method**: `POST`
- **Description**: Generates a response based on the user's chat history using the Gemini API.
- **Parameters**:
  - `chatId` (URL parameter) – Set `0` for a new chat, or provide an existing chat ID.
- **Body**:
  - `message` (string) – The new user message to be included in the chat history.
  - `userId` (string) – The ID of the user initiating the chat.
- **Response**:
  - 200: Returns the generated response from the Gemini API.
  - 500: Error message if content generation fails.

#### 2. Save a New Message

- **URL**: `chat/saveMessage`
- **Method**: `POST`
- **Description**: Adds a new message to an existing chat.
- **Body**:
  - `chatId` (string) – The ID of the chat to add the message to.
  - `text` (string) – The message text.
  - `sender` (string) – Either "user" or "model".
- **Response**:
  - 201: Successfully saves the message to the chat.
  - 500: Error message if message saving fails.

#### 3. Retrieve Chat History
- **URL**: `/getChatHistory/:chatId`
- **Method**: `GET`
- **Description**: Fetches the entire chat history for a specific chat ID.
- **Parameters**:
  - `chatId` (URL parameter) – The ID of the chat to retrieve.
- **Response**:
  - 200: Returns the chat history as a JSON object.
  - 404: If the chat with the specified chatId does not exist.
  - 500: Error message if retrieving the chat history fails.

#### 3. Retrieve All Chats for a User
- **URL**: `/getAllChatsForUser/:userId`
- **Method**: `GET`
- **Description**: Fetches all chats associated with a specific user ID.
- **Parameters**:
  - `userId` (URL parameter) – The ID of the user whose chats to retrieve.
- **Response**:
  - 200: Returns an array of chat objects associated with the user.
  - 404: If no chats are found for the specified user.
  - 500: Error message if retrieving the chats fails.

### User Endpoints

#### 1. Create User

- **URL**: `user/createUser`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Body**:
  - `name` (string) – User's first name.
  - `lastname` (string) – User's last name.
  - `email` (string) – User's email.
  - `password` (string) – User's password (minimum 6 characters).
- **Response**:
  - 201: Successfully creates a new user.
  - 400: Error if user already exists or required fields are missing.

#### 2. User Login by Email

- **URL**: `user/getUserByEmail`
- **Method**: `POST`
- **Description**: Logs in the user and issues a JWT token.
- **Body**:
  - `email` (string) – User's email.
  - `password` (string) – User's password.
- **Response**:
  - 200: Successfully logs in the user and returns user details with a JWT token.
  - 401: Invalid password or user not found.

#### 3. Get User Session

- **URL**: `user/getUserSession`
- **Method**: `GET`
- **Description**: Retrieves the currently logged-in user's session based on the JWT token in cookies.
- **Response**:
  - 200: Returns user details if the token is valid.
  - 401: Unauthorized if the token is missing, expired, or invalid.

#### 4. Logout

- **URL**: `user/removeUserSession`
- **Method**: `POST`
- **Description**: Logs out the user by clearing the JWT token cookie.
- **Response**:
  - 200: Successfully logs out the user and clears the session.
