import { Schema, model } from "mongoose";

const evaluationsSchema = new Schema(
    {
        comment: {
            type: String,
            require: true,
        },

        grade: {
            type: Number,
            require: true,
            min: 0,
        },

        role: {
            type: String,
            require: true,
        },

        idEmployee: {
            type: Schema.Types.ObjectId,
            ref: "employee",
            require: true
        },
    },

        {
            timestamps: true,
            strict: false,
        }
);

export default model("evaluations", evaluationsSchema)