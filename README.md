# Benson-Idahosa-Online-Clearance-System-Student-Project-
An Online Clearance System for Benson Idahosa University (BIU) final-year students. Built with Express.js and MongoDB, the system streamlines departmental and unit clearance via a mobile-friendly, secure web platform. Includes full user authentication, document management, notification handling, and administrative oversight.

# 🎓 BIU Online Clearance System

An Online Clearance System designed for final-year students of **Benson Idahosa University (BIU)**. This web application eliminates the need for physical clearance visits to different departments and units by digitizing and streamlining the process — making it **SMART** (accessible on mobile devices) and efficient.

---

## 🚀 Features

- ✅ **Mobile-first design (SMART)** for final-year students
- 🔐 Full authentication system (JWT-based)
  - Register
  - Login
  - Logout
  - Token refresh
  - Password reset/change
  - Email verification
- 📁 Document management system for uploading and reviewing clearance files
- 🏢 Department and unit clearance workflows
- 🔔 Real-time notifications for status updates
- 🔒 Role-based authorization (e.g., admin, HOD, student)
- ⚙️ Middleware for:
  - Authentication
  - Error handling
  - Rate limiting
  - Logging
  - File upload
  - Input validation

---

## 🧱 Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Refresh Tokens
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan
- **Validation**: Express Validator
- **File Handling**: Multer (for document uploads)

---

## 📦 Models

- **User**: Handles login credentials and roles
- **Student**: Profile and clearance status
- **Document**: Upload and verification for clearance
- **Notification**: Alerts and updates
- **Department**: Department info and officers
- **Clearance**: Tracks clearance per unit

---

## 📂 Folder Structure


