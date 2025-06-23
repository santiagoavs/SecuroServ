import express from "express";
import citationController from "../controllers/citationController.js";

const router = express.Router();

router
  .route('/')
  .get(citationController.getCitations)
  .post(citationController.createCitation);

router
  .route("/:id")
  .put(citationController.updateCitation)
  .delete(citationController.deleteCitation);

export default router;