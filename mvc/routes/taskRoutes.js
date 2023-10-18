const express = require("express")
const router = express.Router()

const TaskController = require('../controllers/TaskController')


router.get('/add', TaskController.createTask)
router.post('/add', TaskController.crateTaskSave)
router.post('/remove', TaskController.removeTask)
router.get('/edit/:id', TaskController.updateTask)
router.post('/edit', TaskController.updateTaskSave)
router.post('/updateStatus', TaskController.toggleStatus)
router.get('/', TaskController.showTasks)

module.exports = router