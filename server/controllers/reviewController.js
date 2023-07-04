const {Review, User, Product} = require('../models/models')
const ApiError = require('../error/apiError')
class ReviewController {
    async create(req, res, next) {
        try {
            const {content, userId, productId} = req.body

            const review = await Review.create({content, userId, productId})

            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.params;
            const reviews = await Review.findAll({
                where: { userId } ,
                include: [
                    { model: User, as: 'user' },
                    {model: Product, as: 'product'}
                ]})

            return res.json(reviews)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ReviewController()