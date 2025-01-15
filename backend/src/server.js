// const express = require("express");
// const bodyParser = require("body-parser");
// const routes = require("./routes/routes");
// const swaggerDocs = require("./swagger");
// const { connectDB } = require("./db/connection");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use("/", routes)
// app.use("/api", routes);

// // Swagger Documentation
// swaggerDocs(app);

// // Start server and connect DB
// // connectDB().then(() => {
// //   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // });


// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect to the database:", err);
//   });
const express = require("express");
const routes = require("./routes/routes");
const swaggerDocs = require("./swagger");
const { connectDB } = require("./db/connection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
//app.use("/", routes); // Remove "/api" here
app.use("/api", routes); // Unified route path for all the routes

// Swagger Documentation
swaggerDocs(app);

// Default 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server and connect DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`); // Access Swagger UI here
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

