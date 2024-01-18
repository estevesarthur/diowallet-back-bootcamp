import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
import "dotenv/config";

// Configurações de conexão sem banco de dados
const connectionConfigWithoutDB = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'aluno123',
};

// Crie uma conexão inicial sem banco de dados
const connectionWithoutDB = await mysql2.createConnection(connectionConfigWithoutDB);

// Função para criar o banco de dados se não existir
async function createDatabase() {
    try {
        // Verifica se o banco de dados existe
        const [rows] = await connectionWithoutDB.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', ['dioWallet_DB']);

        // Se o banco de dados não existir, cria
        if (rows.length === 0) {
            await connectionWithoutDB.query('CREATE DATABASE dioWallet_DB');
            console.log('Banco de dados criado: dioWallet_DB');
        }
    } catch (error) {
        console.error('Erro ao criar o banco de dados:', error.message);
    } finally {
        // Fecha a conexão inicial sem banco de dados
        await connectionWithoutDB.end();
    }
}

// Chama a função para criar o banco de dados antes de usar o pool
await createDatabase();

// Agora, configure o pool com o banco de dados
const pool = mysql2.createPool({
    ...connectionConfigWithoutDB,
    //com falha, nome do banco não deve aparecer
    database: 'dioWallet_DB',
});

// Obter uma conexão do pool usando Promise
pool
    .getConnection()
    .then((connection) => {
        console.log('Conexão estabelecida!');

        // Execute consultas ou outras operações aqui...

        // Ao finalizar suas operações, libere a conexão de volta ao pool
        connection.release();

        // Se você deseja encerrar o pool de conexões (opcional)
        // pool.end();
    })
    .catch((err) => {
        console.log('Erro ao conectar ao banco de dados...', err);
    });

export default pool;