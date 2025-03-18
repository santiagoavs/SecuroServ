import express from "express"
import citationsController from "../controllers/citationsController.js"

const router = express.Router();

router.route("/")
.get(citationsController.getCitation)
.post(citationsController.createCitation);

router.route("/:id")
.put(citationsController.updateCitation)
.delete(citationsController.deleteCitation);

export default router;