import transactionService from "../services/transactionService.js";

async function create(req, res) {
    const body = req.body;
    const id = res.locals.user;

    try {
        const transaction = await transactionService.create(body.id);
        return res.status(201).send(transaction);

    } catch (erro) {
        return res.status(409).send(erro.message);
    }
}

async function findAllByUser(req, res) {
    const id = res.local.user;

    try {
        const transactions = await transactionService.findAllByUser(id);
        return res.send(transactions);

    } catch (erro) {
        return res.status(500).send(erro.message);
    }
}

export default { create, findAllByUser };