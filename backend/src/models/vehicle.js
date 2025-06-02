import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
  model: { type: String, required: true, minlength: 2, maxlength: 50 },
  description: { type: String, required: true, maxlength: 500 },
  releaseDate: { type: String, required: true ,minlength:4,maxlength:4},
  brand: { type: String, required: true, minlength: 2, maxlength: 50 },
  type: { type: String, required: true },
  mileage: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }, 
  image: { type: String, required: true },
  logo: { type: String, required: true}
},
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Vehicle", vehicleSchema);