<div dir="rtl">
# 📚 Student Management API

This is a simple RESTful API built with Node.js, Express, and MongoDB for managing student records.

## 🌟 Features

- Add new students
- View all students with filters (by city and grade range)
- Update student details by student number
- Delete students by ID, name, or other filters
- Interactive API documentation using Swagger
- Environment variables support via `.env` file
- Online deployment for easy testing

---

## 🚀 Live Demo (Online Access)

You can use the API online without needing to install anything locally.

- **Base URL**: [`https://student-management-api-d2hd.onrender.com`](https://student-management-api-d2hd.onrender.com)
- **Swagger UI**: [`https://student-management-api-d2hd.onrender.com/api-docs`](https://student-management-api-d2hd.onrender.com/api-docs)

---

## 📥 Installation

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/student-management-api.git
cd student-management-api
```

2. **Install dependencies**  
```bash
npm install
```

3. **Configure environment variables**  
Create a `.env` file in the root directory:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studentDB
PORT=3000
```

4. **Start the server**  
```bash
node server.js
```

The server will run on `http://localhost:3000` by default.

---

## 🧪 Testing with Postman

You can test all API endpoints using [Postman](https://www.postman.com/).

Example for adding a new student (POST request to `/students`):

```json
{
  "name": "Shenhav",
  "lastName": "Eliya",
  "age": 25,
  "city": "Jerusalem",
  "grade": 100
}
```

Or simply open the [Swagger UI](https://student-management-api-d2hd.onrender.com/api-docs) and try requests directly from your browser.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Swagger (OpenAPI)
- Postman (for testing)
- Render (for deployment)

---

## 🙌 Developed by

**Shenhav Eliya**  
Full Stack Developer in the making 🚀

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/shenhaveliya) 💙
</div>
