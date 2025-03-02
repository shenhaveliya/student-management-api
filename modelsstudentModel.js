const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  grade: { type: Number, required: true }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
