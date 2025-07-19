# 📝 Sequelize Blog API

A full RESTful API built with **Node.js**, **Express**, **Sequelize ORM**, and **MySQL** for managing Users, Posts, and Comments.

---

## 📁 Folder Structure

```bash
src/
├── DB/
│   ├── Models/
│   │   ├── Comments/
│   │   │   └── comment.model.db.js
│   │   ├── Posts/
│   │   │   └── post.model.db.js
│   │   ├── Users/
│   │   │   └── user.model.db.js
│   │   └── db.connection.js
├── Modules/
│   ├── Comments/
│   │   ├── comment.controller.js
│   │   └── comment.service.js
│   ├── Posts/
│   │   ├── post.controller.js
│   │   └── post.service.js
│   └── Users/
│       ├── user.controller.js
│       └── user.service.js
├── index.js
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ziiadamr/sequelize.git
cd sequelize
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root with:

```env
DB_HOST=localhost
DB_NAME=your_database
DB_USER=root
DB_PASSWORD=your_password
PORT=3000
```

### 4. Create the Database

```sql
CREATE DATABASE your_database;
```

### 5. Start the Server

```bash
npm start
```

The server will run at: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Postman Collection

Test all endpoints using Postman:  
👉 [Click here to open the Postman collection](https://www.postman.com/routeassignmentziadamr/workspace/route-assignments/collection/38568669-7cfac108-77c0-4949-a197-c2d78af6eabd?action=share&source=copy-link&creator=38568669)

---

## 🧠 Features

- Sequelize models for Users, Posts, Comments
- Custom validation:
  - Password length > 6
  - Name length > 2 (beforeCreate hook)
  - Valid email format
- Soft delete for Posts using `paranoid: true`
- API structure with **Controllers** & **Services**
- Error handling and validation messages
- Built-in relations:  
  - User ↔ Posts ↔ Comments

---

## 📌 API Endpoints

### 👤 Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /users/signup | Create new user (with validation) |
| PUT    | /users/:id | Update or create user by PK |
| GET    | /users/by-email | Find user by email |
| GET    | /users/:id | Get user by ID (without role) |

---

### 📝 Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /posts | Create new post |
| DELETE | /posts/:postId | Delete post (only owner) |
| GET    | /posts/details | Get posts + user + comments (limited fields) |
| GET    | /posts/comment-count | Get post with comment count |

---

### 💬 Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /comments | Bulk create comments |
| PATCH  | /comments/:commentId | Update comment (only owner) |
| POST   | /comments/find-or-create | Find or create by post/user/content |
| GET    | /comments/search?word=the | Find & count comments with specific word |
| GET    | /comments/newest/:postId | Get latest 3 comments for a post |
| GET    | /comments/details/:id | Get comment with post & user info |

---

## 👨‍💻 Author

Developed by **Ziad Amr**  
🔗 [GitHub](https://github.com/ziiadamr)

---
