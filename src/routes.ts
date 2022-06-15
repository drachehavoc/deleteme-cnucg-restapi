import { Router } from "express"
import person from "./routes/person"

const router = Router()
router.use("/person", person)
export default router