const express = require('express')
const router = express.Router()

const quiz_controller = require('../controllers/quizController')

router.get('/', quiz_controller.quiz_get)
router.post('/add_edit', quiz_controller.quiz_edit_add_post)

module.exports = router