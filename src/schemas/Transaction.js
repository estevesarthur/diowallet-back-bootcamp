import pool from "../config/database.js";

// Consulta para criar a tabela de transactions
const createTransactionsSchemaQuery = `
    CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        value INT NOT NULL,
        description VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        userId INT,
        createdAt_transaction DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`;

// Consulta para inserir uma transação
const insertTransactionQuery = `
    INSERT INTO transactions (value, description, type, userId) VALUES (?, ?, ?, ?)
`;

// Função para criar o esquema da tabela de transactions
const createTransactionsSchema = async () => {
    const connection = await pool.getConnection();
    try {
        // Usa o banco de dados dioWallet_DB
        await connection.query('USE dioWallet_DB');

        // Criação da tabela de transactions
        await connection.query(createTransactionsSchemaQuery);
        console.log('Tabela de transactions criada com sucesso!');

    } catch (error) {
        console.error('Erro ao criar tabela de transactions:', error);
    } finally {
        connection.release();
    }
};

export { createTransactionsSchema, insertTransactionQuery };