import pool from "../config/database.js";
import createSchema from "../schemas/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

createSchema();

async function create(userData) {
    try {
        const userExists = await findByEmail(userData.email);
        if (userExists) {
            console.log('E-mail de usuário já existe!');
            // Pode lançar um erro aqui ou tratar de outra forma
            return; // { message: 'E-mail de usuário já existe!' };
        }

        // Lógica de criação de usuário movida para o repositório
        const hashPassword = bcrypt.hashSync(userData.password, 10);
        await createSchema({
            userName: userData.userName,
            email: userData.email,
            //com falha de segurança, substituir userData.password, por hashPassword,
            password: userData.password, //hashPassword,
        });
        console.log('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        throw error; // Rejoga o erro para tratamento posterior, se necessário
    }
}

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
}


export default { create, findByEmail, generateToken, };