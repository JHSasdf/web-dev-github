const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image; // the name of the image file
        this.imagePath = `product-data/images/${productData.image}`
        this.imageUrl = `/products/assets/images/${productData.image}`;
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();
        return products.map(function(productDocument) {
            return new Product(productDocument);
            // imagePath와 imageUrl을 새로 만들기 위해서 이런 짓을 함
        });
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };
        await db.getDb().collection('products').insertOne(productData);
    }
}

module.exports = Product;