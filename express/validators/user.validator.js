import Joi from '@hapi/joi'

const schema = Joi.object({
    name: Joi.string().min(5).required(),
    age: Joi.number().required()
})



const validateUserSchema = (req, res, next) => {
    const data = req.body;
    const {error} = schema.validate(data);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next()
}

export default validateUserSchema;