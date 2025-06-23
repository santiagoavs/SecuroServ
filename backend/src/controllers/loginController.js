import clientsModel from "../models/customer.js";
import employeesModel from "../models/employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

// CREATE: Login para clientes, empleados y administrador
loginController.login = async (req, res) => {
  const { email, password } = req.body;

  // Validación de campos requeridos
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let userFound;
    let userType;

    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      userFound = await employeesModel.findOne({ email });
      if (userFound) {
        userType = "employee";
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }
      } else {
        userFound = await clientsModel.findOne({ email });
        if (userFound) {
          userType = "client";
          const isMatch = await bcrypt.compare(password, userFound.password);
          if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
          }
        }
      }
    }

    if (!userFound) {
      console.log("No se encuentra en ninguna colección");
      return res.status(404).json({ message: "User not found" });
    }

    jwt.sign(
      {
        id: userFound._id,
        userType,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error generating token" });
        }

        res.cookie("authToken", token, { 
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: '/', 
          sameSite: 'lax', 
          secure: process.env.NODE_ENV === 'production' 
        });
        res.status(200).json({ message: `${userType} login successful`, token, userId: userFound._id });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export default loginController;
