import express from "express"
import vehiclesController from "../controllers/vehicleControler.js"

const router = express.Router();

router
.route('/')
.get(vehiclesController.getVehicle)
.post(vehiclesController.createVehicle);


router
 .route("/:id")
.put(vehiclesController.updateVehicle)
.delete(vehiclesController.deleteVehicle);

export default router