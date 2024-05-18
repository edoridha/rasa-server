const router = require('express').Router()
const Controller = require('../controllers')

router.get('/book', Controller.getBook)
router.post('/book', Controller.createBook)
router.put('/book/:id', Controller.increaseStock)

router.post('/rent', Controller.rentBook)
router.get('/rent', Controller.getRent)
router.put('/rent/:id', Controller.doneRent)

router.get('/student', Controller.getStudent)
router.post('/student', Controller.createStudent)
router.put('/student/:id', Controller.changeStatus)

router.get('/section', Controller.getSection)
router.post('/section', Controller.createSection)

router.get('/history', Controller.getHistory)

module.exports = router