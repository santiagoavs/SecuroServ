import dotenv from "dotenv"

dotenv.config();

 export const config={
db:{
    URI:process.env.DB_URI ? process.env.DB_URI:"mongodb+srv://SecuroServ:SecuroServ12@clustersecuroserv.0vdoy4g.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSecuroServ"
},
server:{
    port:process.env.PORT ? process.env.PORT:"4000"
},
JWT:{
    secret: process.env.JWT_SECRET||"securoser",
    express: process.env.JWT_EXPIRES||"30d"
},
emailAdmin:{
    email:process.env.ADMIN_EMAIL,
    password:process.env.ADMIN_PASSWORD
},
cloudinary:{
    cl_name:process.env.CLOUDINARY_NAME,
    cl_api_key:process.env.CLOUDINARY_API_KEY,
    cl_api_secret: process.env.CLOUDINARY_API_SECRET,
    cl_api_enviroment: process.env.CLOUDINARY_API_ENVIRONMENT
}

}