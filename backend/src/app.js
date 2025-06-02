import express from "express"
import cors from "cors"
import vehicles from './routes/vehicles.js'
import events from "events";
events.EventEmitter.defaultMaxListeners = 15;

const app = express();

//settings

//midlewares
app.use(cors()
)
app.use(express.json())
//routes
app.use("/api/vehicles",vehicles )

export default app;