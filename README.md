# TeamFlow

TeamFlow is a full-stack project management application built with the MERN stack. It allows users to create projects, manage tasks, and track progress using a Kanban-style workflow.

## 🚀 Live Demo

**Frontend:** https://team-flow-pearl-three.vercel.app/

## ✨ Features

* User registration and login
* JWT-based authentication
* Create, edit, and delete projects
* Create, edit, and delete tasks
* Kanban-style task management
* Drag-and-drop task status updates
* Task statuses:

  * Todo
  * In Progress
  * Done
* Project ownership and protected API routes
* Persistent data storage with MongoDB
* Responsive and modern UI

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## 📁 Project Structure

```text
TeamFlow/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── backend/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/TeamFlow.git
cd TeamFlow
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## 🔐 Authentication

TeamFlow uses JWT-based authentication. Users receive a token after logging in, which is used to access protected API routes.

## 📌 Project Purpose

This project was built to practice and demonstrate full-stack web development concepts including:

* REST API development
* CRUD operations
* Authentication and authorization
* MongoDB database management
* React frontend development
* API integration
* Protected routes
* Full-stack deployment

## 👨‍💻 Author

**Suyog Bastakoti**

Built as a MERN stack portfolio project.
