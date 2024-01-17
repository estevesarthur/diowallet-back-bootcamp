import express, { json } from "express";
import authRouter from "./routers/authRoutes.js";
import pool from "./config/database.js";
import createSchema from "./schemas/User.js";

const app = express();

app.use(json());

const obterConexao = async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Conexão estabelecida com o banco de dados!');

      // Ao finalizar suas operações, libere a conexão de volta ao pool
      connection.release();
  
      // Se você deseja encerrar o pool de conexões (opcional)
      // pool.end();
    } catch (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    }
};
  
// Chame a função para obter a conexão
obterConexao();

app.use(authRouter);

//com falha
app.listen(5000, ()=> console.log("Server listening in port 5000"));

//sem falha
/*const port = process.env.PORT;
app.listen(port, ()=> console.log(`Server listening in port ${port}`)); */