import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Teacher API",
      version: "1.0.0",
      description: "CRUD API"
    },
    servers: [
      {
        url: "http://localhost:3000/api"
      }
    ],
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT"
    //     }
    //   }
    // },
    // security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js"]   // important
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
