const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const reviewRouter = require('./reviewRouter')
const typeRouter = require('./typeRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/review', reviewRouter)
router.use('/type', typeRouter)
router.use('/category', categoryRouter)

module.exports = router