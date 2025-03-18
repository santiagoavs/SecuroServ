import { Schema, model } from "mongoose";

const citationsSchema = new Schema(
    {
        citationDate: {
            type: Date,
            require: true,
        },

        idCustomer: {
            type: Schema.Types.ObjectId,
            ref: "customers",
            require: true,
        },

        idEmployee: {
            type: Schema.Types.ObjectId,
            ref: "employee",
            require: true,
        },

        idVehicle : {
            type: Schema.Types.ObjectId,
            ref: "vehicles",
            require: true,
        },

        sale: {
            type: Boolean,
            require: true,
        },
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model("citations", citationsSchema);