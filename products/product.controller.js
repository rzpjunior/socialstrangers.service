const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')

const productService = require('./product.service');

// routes
router.get('/', authorize(), getAll);
router.get('/products/:id', authorize(), getById);
router.post('/products', authorize(), createSchema, create);
router.put('/products/:id', authorize(), updateSchema, update);
router.delete('/products/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    productService.getAll()
        .then(data => res.json(data))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        product_name: Joi.string().required(),
        product_uom: Joi.string().required(),
        product_price: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    productService.create(req.body)
        .then(() => res.json({ message: 'Data saved successfully', status: 'success', data: req.body }))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(data => res.json(data))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        product_name: Joi.string().required(),
        product_uom: Joi.string().empty(''),
        product_price: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(next);
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'Product deleted successfully' }))
        .catch(next);
}