import mariadb from "mariadb"

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string) ?? 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namedPlaceholders: true,
    // connectionLimit: 5,
})

export default pool