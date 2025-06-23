import { config } from "../config.js";
import employeesModel from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  const {
    name,
    password,
    email,
    cellNumber,
    dui,
    area,
    age,
    hireDate,
  } = req.body;

  // Verificación de campos requeridos
  if (!name || !password || !email || !cellNumber || !dui || !area || age === undefined || !hireDate) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // Verificar si el empleado ya existe por email
    const existingEmployee = await employeesModel.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ message: "El empleado ya existe." });
    }

    // Validación de formatos
    if (!/^\d{8}$/.test(cellNumber)) {
      return res.status(400).json({ message: "El número de celular debe contener 8 dígitos." });
    }

    if (!/^\d{8}-\d$/.test(dui)) {
      return res.status(400).json({ message: "Formato de DUI inválido. Debe ser XXXXXXXX-X." });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo empleado
    const newEmployee = new employeesModel({
      name,
      password: hashedPassword,
      email,
      cellNumber,
      dui,
      area,
      age,
      hireDate,
    });

    await newEmployee.save();

    // Generar token JWT
    jwt.sign(
      { id: newEmployee._id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
      (err, token) => {
        if (err) throw err;
        res.cookie("authToken", token);
        res.status(201).json({ message: "Empleado registrado exitosamente." });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error al registrar empleado", error: error.message });
  }
};

export default registerEmployeeController;