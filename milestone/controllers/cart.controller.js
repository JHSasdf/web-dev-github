const Product = require('../models/product.model');

async function addCartItem(req, res) {
    let product;
    try {
        product = await Product.findById(req.body.productId);
    }catch (error) {
        next(error);
        return;
    }
    const cart = res.locals.cart;

    cart.addItem(product);
    req.session.cart = cart;
    // req.session.save()는 redirect같은 콜백함수 실행할 때 적어주면 됨. 알아서 해줌
    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity
    });
}

module.exports = {
    addCartItem: addCartItem
}