import authRepository from "../repositories/authRepository.js";
import bcrypt, { compareSync } from "bcrypt";

async function signup(body) {
    try {
        // Não é necessário verificar a existência aqui
        return await authRepository.create(body);
    } catch (error) {
        console.error('Erro ao criar usuário no serviço:', error);
        throw error;
    }
}

async function signin(body) {
    const userExists = await authRepository.findByEmail(body.email);
    if(!userExists) throw new Error("E-mail e/ou senha incorretos.");

    //com falhas
    const passwordOK = body.password === userExists.password;
    
    //sem falhas
    //const passwordOK = bcrypt.compareSync(body.password, userExists.password);
    if(!passwordOK) throw new Error("E-mail e/ou senha incorretos.");

    return authRepository.generateToken(userExists.id);
}

async function userLogged(id){
    const user = await authRepository.findById(id);
    if(!user) throw new Error("Usuário não encontrado.")
    return user;
}

export default { 
    signup,
    signin,
    userLogged,
};