
import pool from "../database"

export async function getOne(req: any, res: any, tableName: string, columns: string[] = []) {
    let conn
    try {
        conn = await pool.getConnection()
        const result = await conn.query(`SELECT ${columns.length <= 0 ? '*' : columns.join(",")} FROM ${tableName} WHERE ativo=true AND id=:id`, req.params)
        if (result.length <= 0) {
            res.status(204).send()
            conn.release()
            return
        }
        res.json(result[0] ?? null)
        conn.release()
    } catch (e) {
        if (conn) conn.release()
        res.status(500)
        res.json(e)
    }
}

export async function getMany(req: any, res: any, tableName: string, columns: string[] = []) {
    let conn
    try {
        conn = await pool.getConnection()
        const result = await conn.query(`SELECT ${columns.length <= 0 ? '*' : columns.join(",")} FROM ${tableName} WHERE ativo=true AND id>=:id LIMIT :limit`, {
            ...req.params,
            limit: parseInt(req.params.limit) ?? 1
        })
        if (result.length <= 0) {
            res.status(204).send()
            conn.release()
            return
        }
        res.json(result)
        conn.release()
    } catch (e) {
        if (conn) conn.release()
        res.status(500)
        res.json(e)
    }
}

export async function deleteRow(req: any, res: any, tableName: string) {
    let conn
    conn = await pool.getConnection()
    try {
        const result = await conn.query(`UPDATE ${tableName} SET ativo=false WHERE id=:id`, { id: parseInt(req.params.id) })
        res.json(result)
        conn.release()
    } catch (e) {
        if (conn) conn.release()
        res.status(500)
        res.json(e)
    }
}

export async function insert(req: any, res: any, tableName: string, columns: string[] = []) {
    let conn
    conn = await pool.getConnection()
    try {
        const result = await conn.query(
            `INSERT INTO ${tableName}(${columns.join(", ")}) VALUES (${columns.map(v => `:${v}`).join(", ")})`, 
            req.body
        )
        res.json(result)
        conn.release()
    } catch (e) {
        if (conn) conn.release()
        res.status(500)
        res.json(e)
    }
}

export async function update(req: any, res: any, tableName: string, columns: string[] = []) {
    let conn
    conn = await pool.getConnection()
    try {
        const result = await conn.query(
            `UPDATE ${tableName} SET ${columns.map(v => `${v}=:${v}`).join(", ")} WHERE id=:id`
            , { ...req.body, ...req.params }
        )
        res.json(result)
        conn.release()
    } catch (e) {
        console.log(e)
        if (conn) conn.release()
        res.status(500)
        res.json(e)
    }
}