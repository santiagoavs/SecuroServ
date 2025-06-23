import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";
import clientsModel from "../models/customer.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const registerClientController = {};

registerClientController.register = async (req, res) => {
  const { name, lastName, email, password, telephone, dui } = req.body;

  if (!name || !lastName || !email || !password || !telephone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.status(409).json({ message: "Client already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newClient = new clientsModel({
      name,
      lastName,
      email,
      password: passwordHash,
      telephone,
      dui: dui || null,
    });

    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000;

    const tokenCode = jwt.sign(
      {
        email,
        verificationCode,
        expiresAt,
      },
      config.jwt.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email,
        pass: config.email.password,
      },
    });

    const mailOptions = {
      from: config.email.username,
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Para verificar tu cuenta, utiliza el siguiente código de verificación: ${verificationCode}\nEste código expirará en 2 horas.\nSi no solicitaste este registro, por favor ignora este correo.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    res.status(201).json({
      message:
        "Client registered. Please verify your email with the code sent.",
      token: tokenCode,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

registerClientController.verifyCodeEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const token = req.cookies.verificationToken;

  if (!token) {
    return res.status(401).json({ message: "No verification token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (verificationCode !== storedCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    const client = await clientsModel.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.isVerified = true;
    await client.save();
    res.clearCookie("verificationToken");

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying email", error: error.message });
  }
};

export default registerClientController;