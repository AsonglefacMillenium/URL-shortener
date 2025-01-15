

// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "db", // Matches the Docker service name
//   database: "urlshortener",
//   password: "password",
//   port: 5432,
// });

// const connectDB = async () => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS urls (
//         id SERIAL PRIMARY KEY,
//         original_url TEXT NOT NULL,
//         short_url VARCHAR(20) UNIQUE NOT NULL,
//         expires_at TIMESTAMP,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         click_count INTEGER DEFAULT 0
//       );
//     `);
//     console.log("Database connected and table ensured");
//   } catch (err) {
//     console.error("Database initialization error:", err);
//   }
// };

// module.exports = { pool, connectDB };



const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db", // Matches the Docker service name
  database: "urlshortener",
  password: "password",
  port: 5432,
});

const connectDB = async () => {
  try {
    // Ensure the 'urls' table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS urls (
        id SERIAL PRIMARY KEY,
        original_url TEXT NOT NULL,
        short_url VARCHAR(20) UNIQUE NOT NULL,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        click_count INTEGER DEFAULT 0
      );
    `);

    // Ensure the 'analytics' table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        short_url VARCHAR(20) NOT NULL REFERENCES urls(short_url) ON DELETE CASCADE,
        click_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45) -- For IPv6 compatibility
      );
    `);

    console.log("Database connected and tables ensured");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
};

module.exports = { pool, connectDB };
