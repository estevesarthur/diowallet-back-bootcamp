import pool from "../config/database.js";
import { createTransactionsSchema, insertTransactionQuery, getTransactionsByUserIdQuery } from "../schemas/Transaction.js";
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

async function findAllByUser(user) {
    const connection = await pool.getConnection();
    try {
        // Use apenas o ID do usuário
        const userId = user.id;

        console.log('Consultando transações para o userId:', userId);

        // Execute a consulta SQL para recuperar as transações do usuário
        const [transactions] = await connection.execute(getTransactionsByUserIdQuery, [userId]);

        console.log('Transações encontradas:', transactions);

        return transactions;
    } catch (error) {
        console.error('Erro ao encontrar transações por usuário:', error.message);
        throw error;
    } finally {
        connection.release();
    }
}


export default { create, findAllByUser};