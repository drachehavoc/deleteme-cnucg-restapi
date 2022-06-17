import { Router, json } from "express"
import { deleteRow, getMany, getOne, insert, update } from "./utils"

const router = Router()

router.use(json())

const tableName = "instituicoes"

const selCols: string[] = []

const insCols: string[] = [
    "razao_social",
    "cnpj",
    "endereco_logradouro",
    "endereco_numero",
    "endereco_complemento",
    "endereco_cep",
    "endereco_cidade",
    "endereco_estado",
    "endereco_bairro",
    "email",
]

const updtCols = insCols

router.get("/:id", async (req, res) => getOne(req, res, tableName, selCols))
router.get("/:id/:limit", async (req, res) => getMany(req, res, tableName, selCols))
router.delete("/:id", async (req, res) => deleteRow(req, res, tableName))
router.post("/", async (req, res) => insert(req, res, tableName, insCols))
router.put("/:id", async (req, res) => update(req, res, tableName, updtCols))

export default router