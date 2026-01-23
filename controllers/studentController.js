import db from "../db/db.js";

export const createStudent = (req, res) => {
  const { name, age, Stdclass, teacher_id } = req.body;
  const sql =
    "INSERT INTO students (name, age, Stdclass, teacher_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, age, Stdclass, teacher_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Insert failed",
        error: err
      });
    }

    const selectSql = "SELECT * FROM students WHERE id = ?";

    db.query(selectSql, [result.insertId], (err, data) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Fetch failed"
        });
      }

      res.status(201).json({
        status: true,
        message: "Student added successfully",
        data: data[0]
      });
    });
  });
};


export const getStudents = (req, res) => {
  const sql = `
    SELECT students.*, teachers.name AS teacher
    FROM students
    LEFT JOIN teachers ON students.teacher_id = teachers.id
  `;
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

export const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const sql = "UPDATE students SET name=?, age=? WHERE id=?";

  db.query(sql, [name, age, id], (err, result) => {
    if (err) {
      return res.status(500).json({status:false, message: "Update failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ status:false,message: "Student not found" });
    }
    const selectSql = "SELECT * FROM students WHERE id=?";
    db.query(selectSql, [id], (err, data) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Failed to fetch updated student"
        });
      }
      res.status(200).json({
        status: true,
        message: "Student updated successfully",
        data: data[0]
      });
    });
  });
};

export const deleteStudent = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM students WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ status: false,message: "Delete failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({status: false, message: "Student not found" });
    }

    res.status(200).json({ status: true,message: "Student deleted successfully" });
  });
};
