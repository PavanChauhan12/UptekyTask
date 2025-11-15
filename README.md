# 🚀 Feedback Management Dashboard - MERN Stack

A modern, full-stack feedback management system built with MongoDB, Express.js, React, and Node.js. Features a beautiful gradient UI, real-time analytics, and comprehensive feedback management capabilities.

![Feedback Dashboard](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

### **Core Features**
- ✅ **Feedback Submission Form** – User-friendly with name, email, message & a 5-star rating
- ✅ **Real-time Dashboard Analytics** – Total feedbacks, average rating, sentiment stats
- ✅ **Feedback Table** – View all submissions with timestamps
- ✅ **RESTful API** – Clean Express.js backend with validation
- ✅ **MongoDB Integration** – Efficient data storage and retrieval

### **Bonus Features**
- 🔍 Search & Filter feedbacks  
- 📊 Export to CSV  
- 🗑️ Delete feedback entries  
- 🎨 Gradient UI with smooth animations  
- 📱 Fully responsive design  

---

## 🛠️ Tech Stack

### **Frontend**
- React 18  
- Vite  
- Axios  
- Lucide React  
- CSS3 (custom gradients)

### **Backend**
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

---

## 📁 Project Structure
feedback-dashboard/
├── backend/
│ ├── config/db.js
│ ├── models/Feedback.js
│ ├── routes/feedback.js
│ ├── server.js
│ └── .env.example
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── FeedbackForm.jsx
│ │ │ ├── FeedbackTable.jsx
│ │ │ ├── AnalyticsCards.jsx
│ │ │ └── SearchFilter.jsx
│ │ ├── services/api.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── index.html
│ └── .env.example
└── README.md


---

## 🚀 Quick Start

### **Prerequisites**
- Node.js v14+
- MongoDB (Local or Atlas)
- npm or yarn

### **1. Clone Repo**
```bash
git clone <your-repo-url>
cd feedback-dashboard
```

### **2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
```
Update .env with:
```bash
MONGODB_URI=your_mongo_url
```
Start the server:
```bash
npm start
# or
npm run dev
```

### **3. Frontend Setup**
```bash


