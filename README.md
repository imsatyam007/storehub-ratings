# StoreHub Ratings Platform

A full-stack Store Rating Platform built with React, Express.js, Prisma ORM, and MySQL. The application provides role-based access for Admins, Users, and Store Owners to manage stores, ratings, and user accounts securely using JWT authentication.

---

## Project Overview

StoreHub Ratings Platform enables users to register, browse stores, and submit ratings. Store owners can monitor ratings and view users who rated their stores, while administrators have complete control over users, stores, and platform analytics.

The application follows a role-based authentication system with secure REST APIs and a responsive user interface.

---

## Features

### Authentication
- JWT Authentication
- Role-Based Authorization
- User Registration
- User Login
- Logout
- Change Password

---

### Admin Module
- Dashboard Statistics
- Manage Users
- View User Details
- Manage Stores
- View Store Details
- View Ratings
- Search Users
- Search Stores
- Sorting
- Pagination

---

### User Module
- Dashboard
- Browse Stores
- Search Stores
- View Store Details
- Submit Ratings
- Update Ratings
- View My Ratings
- Change Password

---

### Store Owner Module
- Dashboard
- View Store Information
- View Store Average Rating
- View Users Who Rated the Store
- View Total Ratings
- Change Password

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT Authentication
- bcrypt
- Express Validator

---

## Project Structure

```
storehub-ratings/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── prisma/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/storehub-ratings.git
```

```bash
cd storehub-ratings
```

---

### Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

NODE_ENV=development

DATABASE_URL=mysql://username:password@localhost:3306/storehub

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=1d

CLIENT_URL=http://localhost:5173
```

Run Prisma Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Seed Database

```bash
npm run seed
```

Start Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd ../client
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend

```bash
npm run dev
```

---

## Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| PORT | Backend Port |
| NODE_ENV | Environment |
| DATABASE_URL | MySQL Connection URL |
| JWT_SECRET | JWT Secret Key |
| JWT_EXPIRES_IN | Token Expiry |
| CLIENT_URL | Frontend URL |

---

### Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

---

## API Endpoints

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
```

---

### Admin

```
GET    /api/admin/dashboard

GET    /api/admin/users
GET    /api/admin/users/:id
POST   /api/admin/users

GET    /api/admin/stores
GET    /api/admin/stores/:id
POST   /api/admin/stores

GET    /api/admin/ratings
```

---

### User

```
GET    /api/user/dashboard

GET    /api/user/stores
GET    /api/user/stores/:id

POST   /api/user/stores/:id/rating
PUT    /api/user/stores/:id/rating

GET    /api/user/ratings

PUT    /api/user/password
```

---

### Store Owner

```
GET    /api/owner/dashboard

PUT    /api/owner/password
```

---

## Default Test Accounts

### Admin

```
Email:
admin@example.com

Password:
Admin@123
```

### User

```
Email:
john@example.com

Password:
John@123
```

### Store Owner

```
Email:
michael@example.com

Password:
Owner@123
```

> Change these credentials if you modify the seed data.

---

## Future Improvements

- Toast Notifications
- Profile Management
- Image Upload
- Email Verification
- Forgot Password
- Dark Mode
- Dashboard Charts
- Export Reports

---

## License

This project is developed for learning purposes and coding assessment demonstrations.