import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();   
const db = mysql.createConnection({
host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log()
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }
  console.log("✅ MySQL Connected");
});

export default db;
