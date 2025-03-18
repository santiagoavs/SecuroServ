// Importaciones de librería
import express from "express";
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewRoutes from "./src/routes/reviews.js";
import evaluationsRoutes from "./src/routes/evaluations.js";


const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/evaluations", evaluationsRoutes);


export default app;
