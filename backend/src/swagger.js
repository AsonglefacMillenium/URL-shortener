// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "URL Shortener API",
//       version: "1.0.0",
//       description: "API for shortening URLs",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/api",
//       },
//     ],
//   },
//   apis: ["./routes/routes.js"], // Path to API definitions
// };

// const swaggerSpec = swaggerJsDoc(options);

// const swaggerDocs = (app) => {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };

// module.exports = swaggerDocs;


const swaggerDocument = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");


const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = swaggerDocs;
