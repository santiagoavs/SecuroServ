import express from "express";
import passwordRecoveryController from "../controllers/passwordRecoveriController.js";

const router = express.Router();

router.post("/requestCode", passwordRecoveryController.requestCode);
router.post("/verifyCode", passwordRecoveryController.verifyCode);
router.post("/resetPassword", passwordRecoveryController.resetPassword);

export default router;