import employeeModel from '../models/employee.js';
const employeeController = {};

// GET
employeeController.getEmployees = async (req, res) => {
  const employees = await employeeModel.find();
  res.json(employees);
};

// INSERT
employeeController.createEmployee = async (req, res) => {
  const { name, password, email, cellNumber, dui, area, age, hireDate } = req.body;
  const newEmployee = new employeeModel({ name, password, email, cellNumber, dui, area, age, hireDate });
  await newEmployee.save();
  res.json({ message: "Employee saved" });
};

// DELETE
employeeController.deleteEmployee = async (req, res) => {
  const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedEmployee) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  res.json({ message: "Employee deleted" });
};

// UPDATE
employeeController.updateEmployee = async (req, res) => {
  const { name, password, email, cellNumber, dui, area, age, hireDate } = req.body;
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    { name, password, email, cellNumber, dui, area, age, hireDate },
    { new: true }
  );
  res.json({ message: "Employee updated" });
};

export default employeeController;