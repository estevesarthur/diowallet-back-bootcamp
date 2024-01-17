import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

//Com falha de segurança
const pool = mysql2.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'aluno123',
    database: 'dioWallet_DB',
});

//sem falha de segurança
/* const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}); */

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