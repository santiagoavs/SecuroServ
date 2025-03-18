import { Schema, model } from "mongoose";

const vehiclesSchema = new Schema(
  {
    model: {
      type: String,
      require: true,
    },

    description: {
        type: String,
    },

    releaseDate: {
      type: Date,
    },

    brand: {
      type: String,
      require: true,
    },

    type: {
      type: String,
      require: true,
    },

    mileage: {
      type: Number,
      require: true,
      min: 0,
    },

    manual: {
      type: Boolean,
      require: true,
    },

    price: {
      type: Number,
      require: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("vehicles", vehiclesSchema);
