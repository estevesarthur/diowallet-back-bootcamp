import Joi from "joi";

const userRegistrationSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required().label('Nome de usuário'),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: false }
    }).min(12).required().label('Endereço de e-mail'),
    password: Joi.string().min(8).max(16).required().pattern(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})')
    ).label('Senha').message('A senha deve conter pelo menos 8 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial.'),
    createAt: Joi.string(),
});

const CreateUser = (user) => {
    return userRegistrationSchema.validate(user, { abortEarly: false });
};

export default CreateUser;
