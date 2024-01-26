import express, { json, response } from "express";
import authRouter from "./routers/authRoutes.js";
import pool from "./config/database.js";
import transactionRouter from "./routers/transactionRoutes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Substitua pelo seu front-end ou '*' para permitir de qualquer origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
}));

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


app.use(express.json());

app.use(authRouter);
app.use(transactionRouter);

//com falha
app.listen(5000, ()=> console.log("Server listening in port 5000"));

//sem falha
/*const port = process.env.PORT;
app.listen(port, ()=> console.log(`Server listening in port ${port}`)); */