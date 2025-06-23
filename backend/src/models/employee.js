import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  cellNumber: { type: String, required: true, match: /^\d{8}$/ },
  dui: { type: String, required: true, match: /^\d{8}-\d$/ },
  área: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  hireDate: { type: Date, required: true }
},
{
  timestamps: true,
  strict: false,
});

export default model("Employee", employeeSchema);