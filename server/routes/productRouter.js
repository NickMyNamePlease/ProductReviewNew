const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',  checkRole('ADMIN'), productController.create) //checkRole('ADMIN'),
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.delete('/:id', productController.deleteOne)

module.exports = router