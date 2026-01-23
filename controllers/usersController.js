import bcrypt from "bcrypt";
import db from "../DB/db.js";


/* ================= REGISTER ================= */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  //! Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "All fields are required"
    });
  }

  //! Check if user already exists
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Database error"
        });
      }

      if (result.length > 0) {
        return res.status(409).json({
          status: false,
          message: "User already exists"
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertSql =
          "INSERT INTO users (name, email, password) VALUES (?,?,?)";
        db.query(
          insertSql,
          [name, email, hashedPassword],
          (err, insertResult) => {
            if (err) {
              return res.status(500).json({
                status: false,
                message: "User registration failed"
              });
            }
                res.status(201).json({
                  status: true,
                  message: "User registered successfully",
                  data: {
    id: insertResult.insertId,
    name,
    email
  }
              }
            );
          }
        );
      } catch (error) {
        return res.status(500).json({
          status: false,
          message: "Password hashing failed"
        });
      }
    }
  );
};


/* ================= LOGIN ================= */
export const login = (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Email and password required"
    });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Database error"
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: false,
          message: "User not found"
        });
      }

      const user = result[0];
      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials"
        });
      }
      // send login data
      res.json({
        status: true,
        message: "Login successful",
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        },
      
      });
    }
  );
};

