import { Schema,model } from "mongoose";
 
const reviewsSchema = new Schema (
 
 
    {
 
        Comment: {
            type: String,
            require: true
        },
        Raiting: {
           
            type: Number,
            require: true,
            min: 1,
            max: 5
        },
 
         
        idClient:{
 
            type: Schema.Types.ObjectId,
            ref: "customers",
            require: true
 
        },
    },
 
        {
            timestamps: true,
            strict: false
        },
 
       
   
)
 
export default model ("Reviews", reviewsSchema);