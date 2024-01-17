import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";
import createSchema from '../schemas/User.js';

async function signup(body) {
    try {
        const userExists = await authRepository.findByEmail(body.email);
        if (userExists) {
            throw new Error("E-mail de usuário já existe!");
        }

        // Adicione a lógica de criação de usuário diretamente no serviço
        const hashPassword = bcrypt.hashSync(body.password, 10);

        // Se preferir, você pode mover isso para o repositório, dependendo da sua arquitetura
        await createSchema({
            name: body.name,
            email: body.email,
            password: hashPassword,
        });

        return { success: true, message: 'Usuário criado com sucesso!' };
    } catch (error) {
        console.error('Erro ao criar usuário no serviço:', error);
        throw error; // Rejoga o erro para tratamento posterior, se necessário
    }

    //com falha
    const userExists = await authRepository.findByEmail(body.email);
    if(userExists) throw new Error("E-mail de usuário já existe!");
    return await authRepository.create(body); // Se estiver usando senhas sem criptografia

    //sem falha
    /*const userExists = await authRepository.findByEmail(body.email);
    if(userExists) throw new Error("E-mail de usuário já existe!");
    const hashPassword = bcrypt.hashSync(body.password, 10);
    return await authRepository.create({...body, password: hashPassword}); */
}

export default { 
    signup,
};