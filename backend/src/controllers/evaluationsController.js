const evaluationsController = {};
import evaluationsModel from "../models/Evaluations.js";

//SELECT
evaluationsController.getEvaluation = async (req, res) => {
    const evaluations = await evaluationsModel.find();
    res.json(evaluations);
};

//INSERT
evaluationsController.insertEvaluation = async (req, res) => {
    const { comment, grade, role, idEmployee } = req.body;
    const newEvaluation = new evaluationsModel ({comment, grade, role, idEmployee})
    await newEvaluation.save()
    res.json({message: "Evaluation saved"})
};

//DELETE
evaluationsController.deleteEvaluation = async (req, res) => {
    await evaluationsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Evaluation deleted"})
};

//UPDATE
evaluationsController.updateEvaluation = async (req, res) => {
    const { comment, grade, role, idEmployee } = req.body;
    await evaluationsModel.findByIdAndUpdate(
        req.params.id,
        { comment, grade, role, idEmployee },
        { new: true }
    );
    res.json({message: "Evaluation updated"})
};

export default evaluationsController;