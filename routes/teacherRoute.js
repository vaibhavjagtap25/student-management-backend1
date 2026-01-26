import express from "express";
import { createTeacher, getTeachers } from "../controllers/teacherController";

const router = express.Router();
/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subject
 *               
 *             properties:
 *               name:
 *                 type: string
 *                 example: vaibhav
 *           
 *               subject:
 *                 type: string
 *                 example: Nodejs

 *     responses:
 *       201:
 *         description: Teachser created successfully
 */

router.post("/teachers", createTeacher);


/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all Teachers
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/teachers", getTeachers);

export default router;
