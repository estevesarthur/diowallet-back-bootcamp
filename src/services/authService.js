import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";

async function signup(body) {

    //com falha
    const userExists = await authRepository.findByEmail(body.email);
    if(userExists) throw new Error("E-mail de usuário já existe!");
    return authRepository.create(body); // Se estiver usando senhas sem criptografia

    //sem falha
    /*const userExists = await authRepository.findByEmail(body.email);
    if(userExists) throw new Error("E-mail de usuário já existe!");
    const hashPassword = bcrypt.hashSync(body.password, 10);
    return authRepository.create({...body, password: hashPassword}); */
}

export default { 
    signup,
};