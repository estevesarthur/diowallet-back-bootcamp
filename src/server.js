import express, { json } from "express";
import authRouter from "./routers/authRoutes.js";
import pool from "./config/database.js";
import createSchema from "./schemas/User.js";

const app = express();
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }

    console.log('Conexão estabelecida com o banco de dados!');

});

app.use(json());
app.use(authRouter);

//com falha
app.listen(5000, ()=> console.log("Server listening in port 5000"));

//sem falha
/*const port = process.env.PORT;
app.listen(port, ()=> console.log(`Server listening in port ${port}`)); */