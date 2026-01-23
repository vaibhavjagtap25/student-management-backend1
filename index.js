import express from "express"
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import studentRoute from "./routes/StudentRoute.js"
import teacherRoute from "./routes/teacherRoute.js"
import userRoute from "./routes/userRoute.js"
dotenv.config();
const app=express()
app.use(express.json())
app.use("/api",studentRoute)
app.use("/api", teacherRoute);
app.use("/api", userRoute);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(process.env.PORT,()=>{
  console.log("run server ",`http://localhost:3000/api`)
    console.log("Swagger → http://localhost:3000/api");
})