import transactionRepository from "../repositories/transactionRepository.js";

async function create(body, id) {
    if (!id) {
        throw new Error("O ID do usuário é necessário para criar uma transação.");
    }

    return transactionRepository.create({...body, userId: id});
}

async function findAllByUser(id){
    if(!id) throw new Error("Usuário é requerido..");
    return await transactionRepository.findAllByUser(id);
}

export default { create, findAllByUser };
