const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const {User} = require('../models/models')

const generateJwt = (id, name, email, role) => {
    return jwt.sign(
        {id, name, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        const hasEnoughDigits = /[0-9]{4}/.test(password)
        const hasEnoughLetters = /[a-zA-Z]{4}/.test(password)

        if (!email || !password || !name) {
            return next(ApiError.badRequest('Введені не усі дані'));
        }

        if (!validator.isEmail(email)) {
            return next(ApiError.badRequest('Некорректний формат email'));
        }

        if (password.length < 8) {
            return next(ApiError.badRequest('Пароль повинен містити не меньше 8 символів'))
        }

        if (!hasEnoughDigits || !hasEnoughLetters) {
            return next(ApiError.internal('Пароль повинен містити принаймні 4 літери та 4 цифри'))
        }

        const candidateEmail = await User.findOne({ where: { email } });

        if (candidateEmail) {
            return next(ApiError.badRequest('Користувач з таким email вже існує'))
        }

        const candidateName = await User.findOne({ where: { name } });

        if (candidateName) {
            return next(ApiError.badRequest("Користувач з таким ім'ям вже існує"))
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            name,
            email,
            role,
            password: hashPassword,
        });

        const token = generateJwt(
            user.id,
            user.name,
            user.email,
            user.role
        );

        return res.json({ token });
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})

            if (!user) {
                return next(ApiError.internal('Такого користувача не існує, перевірте введені дані'))
            }

            if (!validator.isEmail(email)) {
                return next(ApiError.internal('Некорректний формат email'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword) {
                return next(ApiError.internal('Вказано невірний пароль'))
            }

            const token = generateJwt(
                user.id,
                user.name,
                user.email,
                user.role
            )

            return res.json({token})
        } catch (e) {
            return next(ApiError.internal('Такого користувача не існує, перевірте введені дані'));
        }

    }

    async check(req, res) {
        const token = generateJwt(
            req.user.id,
            req.user.name,
            req.user.email,
            req.user.role
        )

        return res.json({token})
    }

}

module.exports = new UserController()