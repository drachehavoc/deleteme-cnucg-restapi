import { Router, json } from "express"
import { deleteRow, getMany, getOne, insert, update } from "./utils"

const router = Router()

router.use(json())

const tableName = "caes_guia"

const selCols: string[] = []

const insCols: string[] = [
    "sexo",
    "cor",
    "nome",
    "data_nascimento",
    "raca",
    "numero_registro",
    "id_instituicao",
    "id_usuario",
]

const updtCols = insCols

router.get("/:id", async (req, res) => getOne(req, res, tableName, selCols))
router.get("/:id/:limit", async (req, res) => getMany(req, res, tableName, selCols))
router.delete("/:id", async (req, res) => deleteRow(req, res, tableName))
router.post("/", async (req, res) => insert(req, res, tableName, insCols))
router.put("/:id", async (req, res) => update(req, res, tableName, updtCols))

export default router