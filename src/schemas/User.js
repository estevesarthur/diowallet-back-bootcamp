import pool from "../config/database.js";

const createSchemaQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(16) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

    )
`;

const createSchema = async () => {
    const connection = await pool.getConnection();

    try {
        await connection.query(createSchemaQuery);
        console.log('Tabela criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabela:', error);
    } finally {
        connection.release();
    }
};

export default { createSchema };