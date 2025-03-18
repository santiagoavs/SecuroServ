import { Schema, model } from "mongoose";

const salesSchema = new Schema(
    {
        saledate: {
            type: Date,
            require: true,
        },

        paymentMethod: {
            type: String,
            require: true,
        },

        idVehicle: {
            
        }
    }
);