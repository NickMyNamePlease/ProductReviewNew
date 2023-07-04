const {Category} = require("../models/models");
const ApiError = require("../error/apiError");


class CategoryController {
    async create(req, res, next) {
        try {
            const {name, typeId} = req.body

            if(!name && !typeId) {
                return next(ApiError.internal('Ви не введил дані!'))
            }
            if(!name) {
                return next(ApiError.internal('Не вказана назва категорії'))
            }
            if(!typeId) {
                return next(ApiError.internal('Необхідно обрати тип'))
            }

            const category = await Category.create({name, typeId})
            return res.json(category)
        } catch (e) {
            return next(ApiError.internal('Не вдалося створити нову категорію'))
        }
    }

    async getAll(req, res) {
        let {typeId} = req.query
        let categories

        if (typeId) {
            categories = await Category.findAll({
                where: { typeId },
                order: [['name', 'ASC']],
            })
        } else {
            categories = await Category.findAll({
                order: [['name', 'ASC']],
            })
        }

        return res.json(categories)
    }
}

module.exports = new CategoryController()