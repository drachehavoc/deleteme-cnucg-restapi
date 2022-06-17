import { Router, json } from "express"
import crypto from "crypto"
import pool from "../database"
import { getOne, getMany, deleteRow, insert, update } from "./utils"

const router = Router()

router.use(json())

const tableName = "usuarios"

function cryptPass(senha: string) {
    return crypto
        .createHash("sha1")
        .update(`${process.env.SALT}${senha}`)
        .digest("hex")
}

const selCols: string[] = [
    "id",
    "nome",
    "cpf",
    "sexo",
    "data_nascimento",
    "endereco_logradouro",
    "endereco_numero",
    "endereco_complemento",
    "endereco_cep",
    "endereco_cidade",
    "endereco_estado",
    "endereco_bairro",
    "email",
    "rg",
    "telefone",
]

const insCols: string[] = [
    "nome",
    "cpf",
    "sexo",
    "data_nascimento",
    "endereco_logradouro",
    "endereco_numero",
    "endereco_complemento",
    "endereco_cep",
    "endereco_cidade",
    "endereco_estado",
    "endereco_bairro",
    "email",
    "rg",
    "telefone",
    "id_instituicao",
    "senha",
]

const updtCols: string[] = [
    "nome",
    "cpf",
    "sexo",
    "data_nascimento",
    "endereco_logradouro",
    "endereco_numero",
    "endereco_complemento",
    "endereco_cep",
    "endereco_cidade",
    "endereco_estado",
    "endereco_bairro",
    "email",
    "rg",
    "telefone",
    "id_instituicao",
]

router.get("/:id", async (req, res) => getOne(req, res, tableName, selCols))
router.get("/:id/:limit", async (req, res) => getMany(req, res, tableName, selCols))
router.delete("/:id", async (req, res) => deleteRow(req, res, tableName))
router.post("/", async (req, res) => insert(req, res, tableName, insCols))
router.put("/:id", async (req, res) => update(req, res, tableName, updtCols))

router.put("/senha/:id", async (req, res) => {
    let conn
    conn = await pool.getConnection()
    try {
        const result = await conn.query(`UPDATE usuarios SET senha=:senha WHERE id=:id`, {
            senha: cryptPass(req.body.senha),
            id: parseInt(req.params.id)
        })
        res.json(result)
        conn.release()
    } catch (e) {
        console.log(e)
        if (conn) conn.release()
        res.status(500)
        res.json(e)
    }
})

export default router