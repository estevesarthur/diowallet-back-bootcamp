import authService from "../services/authService.js";

async function signup(req, res) {
    const body = req.body;

    try {
        const resService = await authService.signup(body);

        return res.status(201).json(resService);
    } catch (error) {
        console.error('Erro ao criar usuário no controller:', error);

        return res.status(409).json({ error: 'Erro ao criar usuário' });
    }
}

async function signin(req, res) {
    const body = req.body;

    try {
        const token = await authService.signin(body);

        return res.status(201).json(token);
    } catch (error) {
        console.error('Erro ao criar usuário no controller:', error);
        
        return res.status(401).json(error.message);
    }
}

export default { signup, signin};