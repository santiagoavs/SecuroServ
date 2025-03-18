const citationsController = {};
import citationsModel from "../models/citations.js"

//SELECT
citationsController.getCitation = async (req, res) => {
    const citation = await citationsModel.find();
    res.json(citation);
};

//INSERT
citationsController.createCitation = async (req, res) => {
    const { citationDate, idCustomer, idEmployee, idVehicle, sale } = req.body;
    const newcitation = new citationsModel({ citationDate, idCustomer, idEmployee, idVehicle, sale });
    await newcitation.save();
    res.json({message: "Citation created"});
};

//DELETE
citationsController.deleteCitation = async (req, res) => {
    const deleteCitation = await citationsModel.findByIdAndDelete(req.params.id);
    if (!deleteCitation) {
        return res.status(404).json({message: "Couldn't find the citation"});
    }
    res.json({message: "Citation deleted"});
};

//UPDATE
citationsController.updateCitation = async (req, res) => {
    const { citationDate, idCustomer, idEmployee, idVehicle, sale } = req.body;
    await citationsModel.findByIdAndUpdate(
        req.params.id, { citationDate, idCustomer, idEmployee, idVehicle, sale }, { new: true}
    );
    res.json({message: "Citation updated"});
};

export default citationsController;