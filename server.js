const mongoose = require("mongoose");
const express = require("express");
const Student = require("./models/studentModel"); 
require("dotenv").config();
const connectDB = require("./db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

(async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
})();

// 📌 פונקציה לקבלת studentNumber הבא
const getNextStudentNumber = async () => {
  const lastStudent = await Student.findOne().sort({ studentNumber: -1 });
  return lastStudent && lastStudent.studentNumber ? lastStudent.studentNumber + 1 : 1;
};

// 📌 הגדרת Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management API",
      version: "1.0.0",
      description: "API for managing students",
    },
    components: {
      schemas: {
        Student: {
          type: "object",
          required: ["name", "lastName", "age", "city", "grade"],
          properties: {
            studentNumber: { type: "integer", example: 1 },
            name: { type: "string", example: "Shenhav" },
            lastName: { type: "string", example: "Eliya" },
            age: { type: "integer", example: 25 },
            city: { type: "string", example: "Jerusalem" },
            grade: { type: "integer", example: 90 },
          },
        },
      },
    },
  },
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /students:
 *   post:
 *     summary: יצירת תלמיד חדש
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Student"
 *     responses:
 *       201:
 *         description: התלמיד נוסף בהצלחה
 */
app.post("/students", async (req, res) => {
  try {
    const studentNumber = await getNextStudentNumber();
    const student = new Student({ ...req.body, studentNumber });
    await student.save();
    res.status(201).json(student.toJSON());
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: קבלת רשימת תלמידים עם חיפוש וסינון
 *     description: מחזיר רשימת תלמידים עם אפשרויות חיפוש לפי שם, עיר, גיל או ציון.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: חיפוש לפי שם (מכיל את המחרוזת המבוקשת)
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: חיפוש לפי עיר
 *       - in: query
 *         name: minAge
 *         schema:
 *           type: integer
 *         description: סינון לפי גיל מינימלי
 *       - in: query
 *         name: maxAge
 *         schema:
 *           type: integer
 *         description: סינון לפי גיל מקסימלי
 *       - in: query
 *         name: minGrade
 *         schema:
 *           type: integer
 *         description: סינון לפי ציון מינימלי
 *       - in: query
 *         name: maxGrade
 *         schema:
 *           type: integer
 *         description: סינון לפי ציון מקסימלי
 *     responses:
 *       200:
 *         description: רשימת תלמידים שהתקבלה בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Student"
 *       404:
 *         description: לא נמצאו תלמידים
 *       500:
 *         description: שגיאת שרת
 */

app.get("/students", async (req, res) => {
    try {
        console.log("📌 Query params received:", req.query);

        let filter = {};

        // 🔍 חיפוש לפי שם (חיפוש גמיש - מכיל את המחרוזת המבוקשת)
        if (req.query.name) filter.name = new RegExp(req.query.name, "i");

        // 🔍 חיפוש לפי עיר
        if (req.query.city) filter.city = new RegExp(req.query.city, "i");

        // 🔍 חיפוש בטווח גילאים (מינימום ומקסימום גיל)
        if (req.query.minAge) filter.age = { $gte: parseInt(req.query.minAge) };
        if (req.query.maxAge) filter.age = { ...filter.age, $lte: parseInt(req.query.maxAge) };

        // 🔍 חיפוש בטווח ציונים (מינימום ומקסימום ציון)
        if (req.query.minGrade) filter.grade = { $gte: parseInt(req.query.minGrade) };
        if (req.query.maxGrade) filter.grade = { ...filter.grade, $lte: parseInt(req.query.maxGrade) };

        console.log("🔍 Filter used for fetching students:", filter);

        const students = await Student.find(filter).select("studentNumber name lastName age city grade");

        if (!students.length) {
            return res.status(404).json({ message: "No students found matching the criteria." });
        }

        res.json(students);
    } catch (error) {
        console.error("❌ Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students", error });
    }
});


/**
 * @swagger
 * /students/{studentNumber}:
 *   put:
 *     summary: עדכון פרטי תלמיד לפי מספר מזהה
 *     parameters:
 *       - in: path
 *         name: studentNumber
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Student"
 *     responses:
 *       200:
 *         description: התלמיד עודכן בהצלחה
 */
app.put("/students/:studentNumber", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { studentNumber: parseInt(req.params.studentNumber) },
      req.body,
      { new: true }
    );
    res.json({ message: "Student updated successfully!", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
});

/**
 * @swagger
 * /students/{studentNumber}:
 *   delete:
 *     summary: מחיקת תלמיד לפי מספר מזהה
 *     parameters:
 *       - in: path
 *         name: studentNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: התלמיד נמחק בהצלחה
 */
app.delete("/students/:studentNumber", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ studentNumber: parseInt(req.params.studentNumber) });
    res.json({ message: "Student deleted successfully!", student });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});

/**
 * @swagger
 * /students/remove:
 *   delete:
 *     summary: מחיקת תלמיד לפי שם או פרמטרים נוספים
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: התלמיד נמחק בהצלחה
 */
app.delete("/students/remove", async (req, res) => {
  try {
    const { name, lastName, age, city } = req.body;
    const filter = {};
    if (name) filter.name = new RegExp(`^${name}$`, "i");
    if (lastName) filter.lastName = new RegExp(`^${lastName}$`, "i");
    if (age) filter.age = parseInt(age);
    if (city) filter.city = city.trim();

    const student = await Student.findOneAndDelete(filter);
    res.json({ message: "Student deleted successfully!", student });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

// 📌 הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
