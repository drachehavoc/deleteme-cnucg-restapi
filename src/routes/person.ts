import { Router } from "express"

const router = Router()

router.get("/", (req, res) => res.send("test get"))
router.post("/", (req, res) => res.send("test post"))
router.put("/", (req, res) => res.send("test put"))
router.delete("/", (req, res) => res.send("test delete"))

export default router