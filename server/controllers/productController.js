const uuid = require('uuid')
const path = require('path');
const {Product, ProductInfo, Review, User, Type, Category} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize")

class ProductController {
    async create(req, res, next) {
        try {
            let {
                name,
                price,
                typeId,
                categoryId,
                brand,
                description,
                info
            } = req.body
            const {img} = req.files

            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({
                name,
                price,
                typeId,
                categoryId,
                brand,
                description,
                img: fileName
            });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {
            typeId,
            categoryId,
            limit,
            page,
            search
        } = req.query

        page = page || 1
        limit = limit || 8

        let offset = page * limit - limit
        let products

        if (typeId && categoryId) {
            products = await Product.findAndCountAll({
                where:{typeId, categoryId},
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [{
                        model: Review,
                        as: 'reviews'
                    }]
            })
        } else if (typeId && !categoryId){
            products = await Product.findAndCountAll({
                where:{typeId},
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [{
                        model: Review,
                        as: 'reviews'
                    }]
            })
        } else if (!typeId && categoryId){
            products = await Product.findAndCountAll({
                where:{categoryId},
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Review,
                    as: 'reviews'
                }]
            })
        } else if (search) {
            products = await Product.findAndCountAll({
                where: {
                    [Op.or]: [{
                        name: { [Op.iLike]: `%${search}%` }
                    }],
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Review,
                    as: 'reviews'
                }]
            })
        } else {
            products = await Product.findAndCountAll({ limit, offset ,
                order: [['createdAt', 'DESC']],
                include: [{
                model: Review,
                    as: 'reviews'
            }]})
        }

        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{
                    model: Review,
                    as: 'reviews',
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                    {model: ProductInfo, as: 'info'},
                    { model: Type},
                    {model: Category}
                ]
            },
        )
        return res.json(product)
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return next();
            }

            await product.destroy();

            return res.json({ message: 'Продукт було успішно видалоно' });
        } catch (error) {
            return next(ApiError.internal('Помилка при видаленні продукту'));
        }
    }
}

module.exports = new ProductController()