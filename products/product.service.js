const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    // validate
    if (await db.Product.findOne({ where: { product_name: params.product_name } })) {
        throw 'Product name "' + params.product_name + '" is already exist';
    }

    // save data
    await db.Product.create(params);
}

async function update(id, params) {
    const data = await getProduct(id);

    // validate
    const product_nameChanged = params.product_name && data.product_name !== params.product_name;
    if (product_nameChanged && await db.Product.findOne({ where: { product_name: params.product_name } })) {
        throw 'Product name "' + params.product_name + '" is already exist';
    }

    // copy params to data and save
    Object.assign(data, params);
    await data.save();

    return data.get();
}

async function _delete(id) {
    const data = await getProduct(id);
    await data.destroy();
}

async function getProduct(id) {
    const data = await db.Product.findByPk(id);
    if (!data) throw 'Data not found';
    return data;
}