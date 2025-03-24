<div dir="rtl">

# Student Management API

מערכת לניהול תלמידים באמצעות RESTful API שבנוי עם Node.js, Express ו-MongoDB.

## תכונות עיקריות

- הוספה, עדכון, מחיקה ושליפה של תלמידים
- סינון תלמידים לפי ציון או עיר
- מספר מזהה ייחודי אוטומטי לכל תלמיד
- תיעוד מלא בעזרת Swagger
- בדיקות באמצעות Postman
- אינטגרציה עם CRM לניהול מידע
- פריסה בענן באמצעות Render

## טכנולוגיות בשימוש

- Node.js & Express
- MongoDB & Mongoose
- Swagger
- Postman
- Git & GitHub
- Render
- CRM Integration

## הוראות התקנה מקומית

1. שיכפול (clone) של הריפוזיטורי:

```bash
git clone https://github.com/username/student-management-api.git
cd student-management-api
```

2. התקנת התלויות:

```bash
npm install
```

3. יצירת קובץ `.env` עם משתנה הסביבה הבא:

```
MONGO_URI=your_mongodb_connection_string
```

4. הרצת השרת:

```bash
npm start
```

## שימוש ב-API

ה-API כולל את הנתיבים הבאים:

- `POST /students` – הוספת תלמיד חדש  
- `GET /students` – קבלת רשימת תלמידים (עם אפשרות לסינון)  
- `PUT /students/:studentNumber` – עדכון פרטי תלמיד  
- `DELETE /students/:studentNumber` – מחיקת תלמיד לפי מספר מזהה  
- `DELETE /students/remove` – מחיקה לפי פרמטרים (שם, גיל, עיר...)

## תיעוד API

ניתן לצפות בתיעוד המלא כאן:  
[Swagger Docs](https://student-management-api-qker.onrender.com/api-docs/#/)
</div>
## קישור לפרויקט בפרודקשן

[Student Management API Live](https://student-management-api-qker.onrender.com/)

## תרומות

תרגישו חופשי ליצור Pull Request עם שיפורים או לפתוח Issues.
