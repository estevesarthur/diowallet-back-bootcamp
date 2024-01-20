import jwt from "jsonwebtoken";
import "dotenv/config";
import authRepository from "../repositories/authRepository.js";

export async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  //console.log("authorization: ", authorization);

  if (!authorization) return res.status(401).send({ message: "Token Inválido 1" });

  const parts = authorization?.split(" ");
  if (parts.length !== 2)
    return res.status(401).send({ message: "Token Inválido 2" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ message: "Token Inválido 3" });

  jwt.verify(token, process.env.SECRET, async (err, decode) => {
    if (err) return res.status(401).send({ message: "Token Inválido 4" });
    if (!decode) return res.status(401).send({ message: "Token Inválido 5" });

    const user = await authRepository.findById(decode.id);
    if (!user) return res.status(401).send({ message: "Token Inválido 6" });

    res.locals.user = user;

    next();
  });
}