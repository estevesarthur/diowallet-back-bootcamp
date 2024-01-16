import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

//Com falha de segurança
const pool = createPool({
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

pool.getConnection((err, pool) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados...', err);
        return;
    }
    console.log('Conexão estabelecida!');

    // Execute consultas ou outras operações aqui...
    // Se você quiser fechar a conexão após realizar suas operações, você pode descomentar a linha abaixo:
    // con.end((err) => {
    //     if (err) {
    //         console.log('Erro ao encerrar a conexão...', err);
    //         return;
    //     }
    //     console.log('A conexão foi encerrada...');
    // });
});

export default { pool };