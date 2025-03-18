import express from "express"
import evaluationsController from "../controllers/evaluationsController.js";

const router = express.Router();

router.route("/")
.get(evaluationsController.getEvaluation)
.post(evaluationsController.insertEvaluation);

router.route("/:id")
.put(evaluationsController.updateEvaluation)
.delete(evaluationsController.deleteEvaluation);

export default router;