// Importaciones de librería
import express from "express";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";


const app = express();

app.use(express.json());

app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);


export default app;
