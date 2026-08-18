# 🚀 GenWeb.ai — AI-Powered Website Builder

GenWeb.ai is a full-stack AI-powered website builder that allows users to generate complete websites from natural language prompts. Users can describe the website they want, generate the code using AI, edit it using an integrated Monaco Editor, preview it live, and manage their generated websites from a dashboard.

## 🌐 Live Demo

https://aiwebsitebuilder-client.vercel.app/
---

## ✨ Features

* 🤖 AI-powered website generation from natural language prompts
* 💻 Integrated Monaco Code Editor
* 👀 Live website preview
* 🔐 Google Authentication using Firebase
* 🔑 JWT-based authentication with HTTP-only cookies
* 📊 User dashboard
* 🌐 Generated website management
* 🪙 Credit-based AI generation system
* 💳 Razorpay payment integration
* ✅ Secure payment verification
* 🗄️ MongoDB database
* 📱 Responsive UI
* 🚀 Production deployment

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Redux Toolkit
* Tailwind CSS
* Axios
* Motion
* Monaco Editor

### Backend

* Node.js
* Express.js
* REST APIs
* JWT
* Cookie Parser
* CORS

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Authentication

* Firebase Authentication
* Google OAuth
* JWT
* HTTP-only Cookies

### AI

* OpenRouter API

### Payments

* Razorpay

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

---

## 🏗️ Project Architecture

```text
GenWeb.ai
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── firebase/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🔄 How It Works

### 1. User Authentication

Users sign in using Google through Firebase Authentication.

After successful authentication:

```text
Google
   ↓
Firebase Authentication
   ↓
React Frontend
   ↓
Express Backend
   ↓
MongoDB
   ↓
JWT Token
   ↓
HTTP-only Cookie
```

### 2. Website Generation

The user enters a natural-language prompt describing the website.

```text
User Prompt
     ↓
React Frontend
     ↓
Express API
     ↓
OpenRouter AI
     ↓
Generated HTML/CSS/JS
     ↓
MongoDB
     ↓
Monaco Editor + Live Preview
```

### 3. Payment & Credits

Users can purchase additional credits through Razorpay.

```text
User
 ↓
Razorpay Checkout
 ↓
Payment
 ↓
Backend Verification
 ↓
Signature Verification
 ↓
Credits Updated
```

---

## 📌 Main Pages

### 🏠 Home
<img width="1793" height="833" alt="image" src="https://github.com/user-attachments/assets/819abcb5-4673-4cb8-90a1-1699c69d49cb" />

### 🤖 AI Website Generator

<img width="1818" height="877" alt="image" src="https://github.com/user-attachments/assets/168dc661-fcc0-493b-92a5-ea0519338b40" />

### 💻 Website Editor

<img width="1893" height="901" alt="image" src="https://github.com/user-attachments/assets/7a77343a-340a-4bd7-9021-150d154976cf" />

### 👀 Live Preview

<img width="1891" height="909" alt="image" src="https://github.com/user-attachments/assets/d9c16c90-fab0-42f0-865c-3fad3123ab79" />

### 📊 Dashboard

<img width="1835" height="909" alt="image" src="https://github.com/user-attachments/assets/a70c6f2b-bd73-4b0d-be00-41af4b4ebca9" />

### 💳 Pricing

<img width="1872" height="891" alt="image" src="https://github.com/user-attachments/assets/65c6be0f-ba5a-4590-b7c9-84202dc48a47" />

---

## 🔐 Authentication Flow

GenWeb.ai uses Firebase Google Authentication along with backend JWT authentication.

1. User clicks **Continue with Google**
2. Firebase authenticates the user
3. User information is sent to the backend
4. Backend checks MongoDB for the user
5. New users are created automatically
6. Backend generates a JWT
7. JWT is stored in an HTTP-only cookie
8. Protected APIs verify the cookie
9. Authenticated user information is returned

---

## 💰 Credit System

GenWeb.ai follows a credit-based SaaS model.

Users receive credits that are consumed when generating websites.

Additional credits can be purchased through Razorpay.

This allows the application to implement a scalable AI usage model.

---

## 📂 Database Models

### User

Stores:

* Name
* Email
* Avatar
* Credits
* Authentication-related information

### Website

Stores generated website information and user ownership.

### Payment

Stores payment-related information required for payment processing and verification.

---

## 🧠 What I Learned

Building GenWeb.ai gave me practical experience with:

* Full-stack MERN architecture
* AI API integration
* Prompt-based application development
* Firebase Authentication
* JWT authentication
* HTTP-only cookies
* Protected routes
* REST API development
* MongoDB and Mongoose
* Razorpay payment integration
* Payment verification
* Credit-based SaaS architecture
* CORS configuration
* Production environment variables
* Vercel and Render deployment
* Debugging production authentication and deployment issues

---

## 🚧 Future Improvements

* AI-powered code modification
* More website templates
* AI chat assistant inside the editor
* Website export/download
* Custom domains
* Website analytics
* Version history
* More payment plans
* Admin dashboard
* SEO tools
* Image generation integration

---

## 👨‍💻 Developer

**Prasad Akiwate**

Full Stack Developer | MERN Stack | AI Applications

### Connect

* GitHub: https://github.com/Prasad-Aki
* LinkedIn: www.linkedin.com/in/prasad-akiwate-621113375

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub!
