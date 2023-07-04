const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.create)
router.get('/:userId', reviewController.getAll)


module.exports = router