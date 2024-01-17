import authService from "../services/authService.js";

async function signup(req, res) {
    const body = req.body;

    try {
        const resService = await authService.signup(body);

        res.status(200).json(resService);
    } catch (error) {
        console.error('Erro ao criar usuário no controller:', error);

        res.status(500).json({ error: 'Erro ao criar usuário' });
    }

    const resService = await authService.signup(body);

    res.send(resService);
}




    

export default { signup };