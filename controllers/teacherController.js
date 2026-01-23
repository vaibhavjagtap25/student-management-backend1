import db from "../DB/db.js";
export const createTeacher = (req, res) => {
  const { name, subject } = req.body;
  const sql =
     "INSERT INTO teachers (name, subject) VALUES (?,?)";
  db.query(sql, [name, subject], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Insert failed",
        error: err
      });
    }
    const selectSql = "SELECT * FROM teachers WHERE id = ?";
    db.query(selectSql, [result.insertId], (err, data) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Fetch failed"
        });
      }
      res.status(201).json({
        status: true,
        message: "Teacher added successfully",
        data: data[0]
      });
    });
  });
};

export const getTeachers = (req, res) => {
   const sql = "SELECT * FROM teachers";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send("Fetch failed");
        }
        res.json({
            status: true,
            message:"data get successfully",
            data: result
        });
    });
};
