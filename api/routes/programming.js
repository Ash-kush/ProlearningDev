const express = require('express')
const router = express.Router()

const program_controller = require('../controllers/programController')

router.post('/', program_controller.pg_compile_post)
router.get('/fetchQuestion', program_controller.fetch_question_get)
router.post('/fetchByTitle', program_controller.fetch_by_title_post)
router.post('/addQuestion', program_controller.add_question_post)
router.post('/editQuestion', program_controller.edit_question_post)

module.exports = router