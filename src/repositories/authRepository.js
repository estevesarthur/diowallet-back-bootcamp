import pool from "../config/database.js";
import createSchema from "../schemas/User.js";

createSchema();

async function create(data) {
    try {
        // Lógica de criação de usuário movida para o repositório
        const hashPassword = data.password; // Se a senha já estiver criptografada no serviço, use-a diretamente
        await createSchema({
            name: data.name,
            email: data.email,
            password: data.password, //hashPassword,
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

        return rows[0]; // Retorna o primeiro resultado (se existir)
    } catch (error) {
        console.error('Erro ao buscar usuário por e-mail:', error);
        throw error; // Rejoga o erro para tratamento posterior
    } finally {
        connection.release(); // Libera a conexão de volta para o pool
    }
}

export default { create, findByEmail };