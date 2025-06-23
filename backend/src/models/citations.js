import { Schema, model } from "mongoose";

const citationSchema = new Schema(
  {
    idCustomer: { type: String, required: true },
    nameCustomer: { type: String, required: true, minlength: 2, maxlength: 50 },
    idCar: { type: String, required: true },
    modeloCar: { type: String, required: true, minlength: 2, maxlength: 50 }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Citation", citationSchema);