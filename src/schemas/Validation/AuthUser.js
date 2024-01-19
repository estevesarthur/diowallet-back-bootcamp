import Joi from "joi";

const emailSchema = Joi.string().email({
    minDomainSegments: 2, // Garante que haja pelo menos um "@" no endereço de e-mail
    tlds: { allow: false } // Desativa a validação de TLD (Top-Level Domain) para permitir domínios locais
}).min(12).required();

const passwordSchema = Joi.string().min(8).max(16).required().pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})')
).message('A senha deve conter pelo menos 8 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial.');

const authUser = (user) => {
    const schema = Joi.object({
        email: emailSchema,
        password: passwordSchema,
    });

    return schema.validate(user);
};

export default authUser;
