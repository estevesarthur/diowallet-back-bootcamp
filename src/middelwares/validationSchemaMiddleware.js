export function validationSchemaMiddleware(schema) {
    return (req, res, next) => {
        const{error} = schema.validade(req.body);
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        next();
    };
}