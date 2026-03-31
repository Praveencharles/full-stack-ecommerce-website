# 🛒 Full Stack eCommerce Website (Powered by Anti Gravity AI)

## 🚀 Overview
This project is a **full-stack eCommerce web application** combining a **Django backend** with a **React (Vite) frontend**, enhanced by **Anti Gravity AI** for intelligent features.

It is designed to provide a fast, scalable, and modern shopping experience with clean architecture and separation of concerns.

---

## 🧱 Tech Stack

### 🔹 Frontend
- React.js (with Vite)
- JavaScript (ES6+)
- CSS

### 🔹 Backend
- Django (Python)

### 🔹 Database
- SQLite (default)

### 🔹 State Management
- Custom store (`store.js`)

### 🔹 AI Integration
- Anti Gravity AI

---

## 📁 Project Structure

antigravity-ecommerce-web/  
│  
├── backend/    
│ ├── api/  
│ ├── ecommerce/  
│ ├── db.sqlite3  
│ ├── manage.py  
│ └── populate.py  
│  
├── frontend/  
│ ├── public/  
│ ├── src/  
│ │ ├── assets/  
│ │ ├── components/  
│ │ ├── pages/  
│ │ ├── App.jsx  
│ │ ├── main.jsx  
│ │ ├── store.js  
│ │ └── CSS files  
│ ├── index.html  
│ ├── package.json  
│ └── vite.config.js  
│  
├── venv/  
└── README.md


---

## ✨ Features

### 👤 User Features
- User authentication
- Browse products
- Product categories & pages
- Add to cart
- Responsive UI

### 🧠 AI Features
- Smart recommendations
- Intelligent search/interaction

### 🛠️ Backend Features
- API-based architecture
- Django ORM
- Scalable backend design

---

## backend setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate (Mac/Linux)

pip install django
python manage.py migrate
python manage.py runserver

```

## Frontend setup  
```bash
cd frontend
npm install
npm run dev
```

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Praveencharles/full-stack-ecommerce-website.git
cd full-stack-ecommerce-website



