import pool from "../config/database.js";
import { createSchema, insertUserQuery, selectUserByEmailQuery } from "../schemas/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function create(userData) {
    try {
        await createSchema();

        const userExists = await findByEmail(userData.email);
        if (userExists) {
            console.log('E-mail de usuário já existe!');
            return;
        }

        // Lógica de criação de usuário movida para o repositório
        //com falha de segurança, substituir userData.password, por hashPassword,
        const hashPassword = bcrypt.hashSync(userData.password, 10);
        await pool.query(insertUserQuery, [userData.userName, userData.email, userData.password]);
        console.log('Dados inseridos com sucesso!');

        const [rows] = await pool.query(selectUserByEmailQuery, [userData.email]);
        console.log('Resultado da consulta:', rows[0]);
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        throw error;
        }
};

async function findByEmail(email) {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        // Retorna o primeiro resultado se existir
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Erro ao buscar usuário por e-mail:', error);
        throw error; // Rejoga o erro para tratamento posterior
    } finally {
        connection.release(); // Libera a conexão de volta para o pool
    }
}

async function generateToken(id){
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 });
};

async function findById(id) {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

        // Retorna o primeiro resultado se existir
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Erro ao buscar usuário por id:', error);
        throw error; // Rejoga o erro para tratamento posterior
    } finally {
        connection.release(); // Libera a conexão de volta para o pool
    }
}

export default { create, findByEmail, generateToken, findById };