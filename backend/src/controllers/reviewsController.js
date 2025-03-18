const reviewController = {};
import reviewModel from "../models/Reviews.js"

reviewController.getReviews = async (req, res) => {
    const reviews = await reviewModel.find().populate("idClient")
    res.json(reviews)
}

reviewController.insertReview = async (req, res) => {
    const { comment, rating, idClient } = req.body;
    const newReview = new reviewModel ({comment, rating, idClient})
    await newReview.save()
    res.json({message: "review saved"})
}

reviewController.deleteReview = async (req, res) => {
    await reviewModel.findByIdAndDelete(req.params.id)
    res.json({message: "review deleted"})
}

reviewController.updateReview = async (req, res) => {
    const { comment, rating, idClient } = req.body;
    await reviewModel.findByIdAndUpdate8(
    req.params.id,
    { commit, rating, idClient },
    { new: true }
    );
    res.json({ message: "review updated" })
};

export default reviewController;