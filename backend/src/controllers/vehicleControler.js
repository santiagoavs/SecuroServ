import vehicleModel from '../models/vehicle.js'
const vehicleController ={};

vehicleController.getVehicle = async (req, res) => {
  const vehicle = await vehicleController.find();
  res.json(vehicle);
};
// INSERT
vehicleController.createVehicle = async (req, res) => {
  const {model, description, releaseDate, brand, type, mileage, price, image, logo } = req.body;
  const newVehicle = new productsModel({ model, description, releaseDate, brand, type, mileage, price, image, logo});
  await newVehicle.save();
  res.json({ message: "vehicle saved" });
};

// DELETE
vehicleController.deleteVehicle = async (req, res) => {
  const deletedProduct = await vehicleModel.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "vehicle no encontrado" });
  }
  res.json({ message: "vehicle deleted" });
};

// UPDATE
vehicleController.updateVehicle = async (req, res) => {
  // Solicito todos los valores
  const { model, description, releaseDate, brand, type, mileage, price, image, logo} = req.body;
  // Actualizo
  await productsModel.findByIdAndUpdate(
    req.params.id,
    {model, description, releaseDate, brand, type, mileage, price, image, logo},
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "vehicle updated" });
};

export default vehicleController;