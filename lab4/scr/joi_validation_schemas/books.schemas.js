const Joi = require('joi');

const BookCreateSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(200)
        .required(),

    author: Joi.string()
        .min(2)
        .max(100)
        .required(),

    year: Joi.number()
        .integer()
        .min(1450)
        .max(new Date().getFullYear()),

    publisherAddress: Joi.string()
        .max(255),

    price: Joi.number()
        .min(0)
        .required(),

    distributor: Joi.string()
        .max(100)
});
  
const BookUpdateSchema = BookCreateSchema.fork(
    ['title', 'author', 'price'], 
    (field) => field.optional()
);

module.exports = {
    BookCreateSchema,
    BookUpdateSchema,
};
