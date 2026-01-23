import express from "express";
import { validateStudent } from "../middleware/validationMiddleware.js";
import {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudents
} from "../controllers/studentController.js"
const router = express.Router();


/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - Stdclass
 *               - teacher_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul
 *               age:
 *                 type: integer
 *                 example: 22
 *               Stdclass:
 *                 type: string
 *                 example: BSC
 *               teacher_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Student created successfully
 */

router.post("/students", validateStudent, createStudent);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/students", getStudents);


/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               Stdclass:
 *                 type: string
 *               teacher_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student updated
 */
router.put("/students/:id", updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student deleted
 */
router.delete("/students/:id", deleteStudent);

export default router;
