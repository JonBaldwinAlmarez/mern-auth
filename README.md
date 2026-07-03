# MERN Auth

A full-stack authentication application built with React, Express, MongoDB, and
Node.js. This project demonstrates user registration, login, email verification,
password reset, and protected user data access using JWT stored in secure
cookies.

## Features

- User registration with password hashing using `bcryptjs`
- Login with JWT authentication stored in httpOnly cookies
- Email verification using one-time OTP codes
- Password reset flow with OTP sent to the registered email
- Protected user routes for profile retrieval and account deletion
- Client-side navigation using React Router and toast notifications

## Project Structure

- `client/` - React frontend built with Vite
- `server/` - Express backend API

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd mern-auth
```

### 2. Install dependencies

Install dependencies separately for the frontend and backend:

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `server/` with the following values:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
SENDER_EMAIL=<email-address-used-for-sending>
SMTP_USER=<smtp-username>
SMTP_PASSWORD=<smtp-password>
```

The app uses MongoDB to store user accounts and `nodemailer` to send
verification and reset emails.

### 4. Run the server

Start the backend from the `server` directory:

```bash
npm run server
```

### 5. Run the client

Start the frontend from the `client` directory:

```bash
npm run client
```

## Usage

1. Open the frontend in your browser, typically at `http://localhost:5173`.
2. Register a new account using name, email, and password.
3. Login with the registered email and password.
4. Verify the account by entering the OTP sent to the registered email.
5. Use the password reset flow if you forget your password.

## Notes

- The backend allows requests from `http://localhost:5173` and supports
  credentials for cookie-based authentication.
- The authentication middleware reads the JWT token from cookies and sets
  `req.userId` for protected routes.
- The user model includes fields for email verification and password reset
  tokens.

## Production

For production deployment, make sure to:

- Use a secure `JWT_SECRET`
- Set `NODE_ENV=production`
- Use HTTPS so cookies marked as `secure` are transmitted safely
- Restrict allowed CORS origins to the deployed frontend domain

---

This README provides the app overview and step-by-step instructions to get the
project running locally.
