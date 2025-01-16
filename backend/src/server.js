
const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors")
const swaggerDocs = require("./swagger");
const { connectDB } = require("./db/connection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors())

app.use(express.json());
//app.use("/", routes); 
app.use("/api", routes); 


swaggerDocs(app);


app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});


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

