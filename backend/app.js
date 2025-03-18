// Importaciones de librería
import express from "express";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import vehiclesRoutes from "./src/routes/vehicles.js";
import citationsRoutes from "./src/routes/citations.js"

const app = express();

app.use(express.json());

app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/vehicles", vehiclesRoutes)
app.use("/api/citations", citationsRoutes)

export default app;
