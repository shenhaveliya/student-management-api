const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// הגדרת Swagger
const options = {
  definition: {
    openapi: "3.0.0", // הגדרת גרסה של Swagger
    info: {
      title: "Student API", // שם ה-API
      version: "1.0.0", // גרסה
      description: "API לניהול תלמידים עם יצירה, עדכון ומחיקה של נתונים", // תיאור
    },
    servers: [
      {
        url: "http://localhost:3000", // כתובת השרת שלך
      },
    ],
  },
  apis: ["./server.js"], // הקובץ שבו Swagger ימצא את ה-Endpoints
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  // הגדרת endpoint שיאפשר לנו לגשת לתיעוד
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
