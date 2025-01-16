const swaggerDocument = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");


const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = swaggerDocs;
