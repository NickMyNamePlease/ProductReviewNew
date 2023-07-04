const {Type} = require("../models/models");
const ApiError = require("../error/apiError")


class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            if (!name) {
                return next(ApiError.internal('Не вказана назва типу'))
            }
            const type = await Type.create({name})
            return res.json(type)
        } catch (e) {
            return next(ApiError.internal('Не вдалося створити новий тип'))
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll({
            order: [['name', 'ASC']],
        })
        return res.json(types)
    }

}

module.exports = new TypeController()