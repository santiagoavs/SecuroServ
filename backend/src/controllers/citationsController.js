import citationModel from '../models/citation.js';

const citationController = {};

// GET
citationController.getCitations = async (req, res) => {
  const citations = await citationModel.find();
  res.json(citations);
};

// INSERT
citationController.createCitation = async (req, res) => {
  const { idCustomer, nameCustomer, idCar, modeloCar } = req.body;
  const newCitation = new citationModel({ idCustomer, nameCustomer, idCar, modeloCar });
  await newCitation.save();
  res.json({ message: "Citation saved" });
};

// DELETE
citationController.deleteCitation = async (req, res) => {
  const deletedCitation = await citationModel.findByIdAndDelete(req.params.id);
  if (!deletedCitation) {
    return res.status(404).json({ message: "Citation no encontrado" });
  }
  res.json({ message: "Citation deleted" });
};

// UPDATE
citationController.updateCitation = async (req, res) => {
  const { idCustomer, nameCustomer, idCar, modeloCar } = req.body;
  await citationModel.findByIdAndUpdate(
    req.params.id,
    { idCustomer, nameCustomer, idCar, modeloCar },
    { new: true }
  );
  res.json({ message: "Citation updated" });
};

export default citationController;