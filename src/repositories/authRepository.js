import connection from "../config/database.js";
import createSchema from "../schemas/User.js";

function create(data){
    return data;
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