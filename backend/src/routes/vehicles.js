import express from "express"
import vehiclesController from "../controllers/vehiclesController.js"

const router = express.Router();

router.route("/")
.get(vehiclesController.getVehicle)
.post(vehiclesController.insertVehicle);

router.route("/:id")
.put(vehiclesController.updateVehicle)
.delete(vehiclesController.deleteVehicle);

export default router;