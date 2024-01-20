import pool from "../config/database.js";
import { createTransactionsSchema, insertTransactionQuery } from "../schemas/Transaction.js";
import jwt from "jsonwebtoken";

async function create(transactionData) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        await createTransactionsSchema();

        // Insira uma transação vinculada a um usuário existente
        await connection.query(insertTransactionQuery, [
            transactionData.value,
            transactionData.description,
            transactionData.type,
            transactionData.userId, // Insira o ID do usuário existente aqui
        ]);

        await connection.commit();
        console.log('Transação inserida com sucesso!');
    } catch (error) {
        await connection.rollback();
        console.error('Erro ao inserir transação:', error);
    } finally {
        connection.release();
    }
}


// Função para decodificar o token JWT
function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Falha ao decodificar o token.');
    }
}

// Função para encontrar todas as transações de um usuário
async function findAllByUser(token) {
    // Decodifica o token para obter o ID do usuário
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    // Obtém todas as transações associadas ao usuário
    return transactionRepository.findAllByUserId(userId);
}


export default { create, findAllByUser};