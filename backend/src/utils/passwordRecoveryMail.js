import nodemailer from 'nodemailer';
import {config} from '../config.js';

// Configurar el transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "SecuroServ@gmail.com", 
    pass: config.emailAdmin.password,
  },
});

// Función para enviar correos
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Soporte SecuroServ" <SecuroServ@gmail.com>', // Dirección del remitente
      to,
      subject,
      text, 
      html,
    });

    return info;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
};

// Función para generar el HTML del correo de recuperación de contraseña
const HTMLRecoveryEmail = (code) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery Email Template</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f0f0f0;">
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #660000; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Password Recovery</h1>
      <p style="font-size: 16px; color: #ffffff; line-height: 1.5;">
        Hello, we received a request to reset your password. Use the verification code below to proceed:
      </p>
      <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #fff; background-color: #DA0A0A; border-radius: 5px; border: 1px solid #B22222;">
        ${code}
      </div>
      <p style="font-size: 14px; color: #ffffff; line-height: 1.5;">
        This code is valid for the next <strong>15 minutes</strong>. If you didn't request this email, you can safely ignore it.
      </p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <footer style="font-size: 12px; color: #ffffff;">
        If you need further assistance, please contact our support team at 
        <a href="supportSecuroServ@gmail.com style="color: #FFB6C1; text-decoration: none;">supportSecuroServ@gmail.com</a>.
      </footer>
    </div>
</body>
</html>
  `;
};

// Exportar las funciones
export { sendEmail, HTMLRecoveryEmail };