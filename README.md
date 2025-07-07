<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="NestJS Logo" /></a>
</p>

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/package/@nestjs/core)
[![License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://opensource.org/licenses/MIT)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/package/@nestjs/common)

# Student Course Enrollment API

A scalable backend API built with [NestJS](https://nestjs.com/) to manage colleges, courses, students, and course enrollments. This system supports role-based access with JWT authentication, allowing Superadmins, College-admins, and Students to perform their respective operations securely.

---

# Student Course Enrollment API

Backend API to manage colleges, courses, students, and course enrollments with role-based access using NestJS and PostgreSQL.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-course-enrollment-api.git
cd student-course-enrollment-api
```

```bash
$ npm install
```

#Generate RSA Keys Using OpenSSL

```bash
# Generate RSA key pair for JWT (RS256)
mkdir -p keys && \
openssl genrsa -out keys/private.key 2048 && \
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

Update key paths in .env as JWT_PRIVATE_KEY_PATH and JWT_PUBLIC_KEY_PATH.

# Environment Setup

## Create a .env file using the example as reference:

```bash
cp .env.example .env
```

# 🚀 Running the App

```bash
npm run start
```

# Access API Documentation

```bash
http://0.0.0.0:3000
```

```bash
Default Superadmin Credentials:
email: 'superadmin@yopmail.com',
Password: Admin@123@123

```

## 📸 Sample

<p align="center">
  <img src="https://drive.google.com/file/d/15eeYODHPADerRh-RD6mgotCKXu69l4HI/view" width="600" />
</p>

# 👨‍💻 Author

Akshay Patidar

# 📜 License

Nest is MIT licensed.
