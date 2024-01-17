import pool from "../config/database.js";

const createSchemaQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

    )
`;

const insertUserQuery = `
    INSERT INTO users (name, email, password) VALUES (?, ?, ?)
`;

const selectUserByEmailQuery = `
    SELECT * FROM users WHERE email = ?
`;

const createSchema = async (userData) => {
    const connection = await pool.getConnection();

    try {
        // Criação da tabela
        await connection.query(createSchemaQuery);
        console.log('Tabela criada com sucesso!');

        // Exemplo de inserção de um usuário
        await connection.query(insertUserQuery, [userData.name, userData.email, userData.password]);
        console.log('Usuário inserido com sucesso!');

        // Exemplo de seleção de um usuário pelo email
        const [rows] = await connection.query(selectUserByEmailQuery, [userData.email]);
        console.log('Resultado da consulta:', rows[0]);
    } catch (error) {
        console.error('Erro ao criar tabela ou realizar operações:', error);
    } finally {
        connection.release();
    }
};

export default createSchema;