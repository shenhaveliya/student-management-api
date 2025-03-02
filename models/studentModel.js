const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentNumber: { type: Number, unique: true, required: true },
    name: String,
    lastName: String,
    age: Number,
    city: String,
    grade: Number
}, { timestamps: true }); // ✅ יוסיף createdAt ו-updatedAt

// שינוי התצוגה כך שלא יראו את _id וה__v, אבל כן יחזיר studentNumber בתור ה-ID
studentSchema.method('toJSON', function () {
    const { _id, __v, ...object } = this.toObject();
    object.id = this.studentNumber; // ✅ מציג studentNumber בתור ID
    return object;
});

const Student = mongoose.model("Student", studentSchema); // ✅ יצירת המודל אחרי שהגדרנו את כל השינויים

module.exports = Student;
