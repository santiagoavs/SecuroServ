import customerModel from '../models/customer.js';
const customerController = {};

// GET
customerController.getCustomers = async (req, res) => {
  const customers = await customerModel.find();
  res.json(customers);
};

// INSERT
customerController.createCustomer = async (req, res) => {
  const { name, password, email, cellNumber, dui, age, registrationDate } = req.body;
  const newCustomer = new customerModel({ name, password, email, cellNumber, dui, age, registrationDate });
  await newCustomer.save();
  res.json({ message: "Customer saved" });
};

// DELETE
customerController.deleteCustomer = async (req, res) => {
  const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id);
  if (!deletedCustomer) {
    return res.status(404).json({ message: "Customer no encontrado" });
  }
  res.json({ message: "Customer deleted" });
};

// UPDATE
customerController.updateCustomer = async (req, res) => {
  const { name, password, email, cellNumber, dui, age, registrationDate } = req.body;
  await customerModel.findByIdAndUpdate(
    req.params.id,
    { name, password, email, cellNumber, dui, age, registrationDate },
    { new: true }
  );
  res.json({ message: "Customer updated" });
};

export default customerController;