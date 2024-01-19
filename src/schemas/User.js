import pool from "../config/database.js";

const createSchemaQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

    )
`;

const insertUserQuery = `
    INSERT INTO users (userName, email, password) VALUES (?, ?, ?)
`;

const selectUserByEmailQuery = `
    SELECT * FROM users WHERE email = ?
`;

const createSchema = async (userData) => {
    const connection = await pool.getConnection();
    try {
        //com falha, userName do database não deve aparecer
        await connection.query('USE dioWallet_DB');

        // Criação da tabela
        await connection.query(createSchemaQuery);
        console.log('Tabela criada com sucesso!');

    } catch (error) {
        console.error('Erro ao criar tabela ou realizar operações:', error);
    } finally {
        connection.release();
    }
};

export { createSchema, insertUserQuery, selectUserByEmailQuery };