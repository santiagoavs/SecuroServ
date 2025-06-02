import dotenv from "dotenv"

dotenv.config();

 export const config={
db:{
    URI:process.env.DB_URI ? process.env.DB_URI:"mongodb+srv://SecuroServ:SecuroServ12@clustersecuroserv.0vdoy4g.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSecuroServ"
},
server:{
    port:process.env.PORT ? process.env.PORT:"4000"
}
 }