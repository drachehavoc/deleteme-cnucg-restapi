import { Router } from "express"
import instituicoes from "./routes/instituicoes"
import caesguia from "./routes/caes-guia"
import usuarios from "./routes/usuarios"

const router = Router()

router.use("/cao-guia", caesguia)
router.use("/instituicao", instituicoes)
router.use("/usuario", usuarios)

export default router