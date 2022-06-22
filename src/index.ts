//-------------------------------------
// WORKAROUND
//-------------------------------------
// @ts-ignore
BigInt.prototype.toJSON = function () { return this.toString() }
//-------------------------------------

import "dotenv/config"
import express from "express"
import cors from "cors"
import routes from "./routes"

const app = express()
const port = process.env.SERVER_PORT

app.use(cors())
app.use(routes)
app.listen(port, () => console.log(`⚡ Server is running on port ${port}.`))