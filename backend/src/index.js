import app from "./app.js";
import "./database.js"
import { config } from "./config.js";


async function main() {
    console.log("server ");
    app.listen(config.server.port)
}
 main();

