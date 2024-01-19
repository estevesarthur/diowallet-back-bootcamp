import jwt from "jsonwebtoken";
import "dotenv/config";
import authRepository from "../repositories/authRepository.js";

export async function authMiddleware(req, res, next){
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).send({message: "Token Inválido."});
    const parts = authorization?.split(" ")
    if(parts.length !== 2) return res.status(401).send({message: "Token Inválido."});

    const [schema, token] = parts;

    if(!/^Bearer$/i.test(schema))
        return res.status(401).send({message: "Token Inválido."});

        jwt.verify(token, process.env.SECRET, async(err, decode) => {
            if(err) return res.status(401).send({message: "Token Inválido."});
            if(!decode) return res.status(401).send({message: "Token Inválido."});

            const user = await authRepository.findById(decode.id);
            if(!user) return res.status(401).send({message: "Token Inválido."});

            res.locals.user = user;

            next();
        });

}