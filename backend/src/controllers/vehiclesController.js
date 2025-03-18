const vehiclesController = {};
import vehiclesModel from "../models/vehicles.js"

//SELECT
vehiclesController.getVehicle = async (req, res) => {
    const vehicle = await vehiclesModel.find();
    res.json(vehicle);
};

//INSERT
vehiclesController.insertVehicle = async (req, res) => {
    const { model, releaseDate, brand, type, mileage, manual, description, price } = req.body;
    const newvehicle = new vehiclesModel({ model, releaseDate, brand, type, mileage, manual, description, price });
    await newvehicle.save();
    res.json({message: "Vehicle saved"});
};

//DELETE
vehiclesController.deleteVehicle = async (req, res) => {
    const deleteVehicle = await vehiclesModel.findByIdAndDelete(req.params.id);
    if (!deleteVehicle) {
        return res.status(404).json({message: "Couldn't find the vehicle"});
    }
    res.json({message: "Vehicle deleted"});
};

//UPDATE
vehiclesController.updateVehicle = async (req, res) => {
    const { model, releaseDate, brand, type, mileage, manual, description, price } = req.body;
    await vehiclesModel.findByIdAndUpdate(
        req.params.id, { model, releaseDate, brand, type, mileage, manual, description, price }, { new: true}
    );
    res.json({message: "Vehicle updated"});
};

export default vehiclesController;