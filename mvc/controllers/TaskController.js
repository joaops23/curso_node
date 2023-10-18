const Task = require('../models/Task')

module.exports = class TaskController {
    
    static createTask(req,res){
        res.render('tasks/create')
    }
    static async showTasks(req,res){
        const tasks = await Task.findAll({raw: true})

        res.render('tasks/all', {tasks})
    }

    static async crateTaskSave(req,res){
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task)

        res.redirect("/tasks")
    }

    static async removeTask(req,res){
        const { id } = req.body

        await Task.destroy({where: {id: id }})

        res.redirect('/tasks')
    }

    static async updateTask(req, res) {
        const {id} = req.params

        const task = await Task.findByPk(id)

        res.render('tasks/edit', {task: task.get({plain: true})})
    }

    static async updateTaskSave(req, res) {
        const {id, title, description} = req.body

        const task = {
            title: title,
            description: description
        }

        await Task.update(task, {where: {id: id}})

        res.redirect("/tasks")
    }

    static async toggleStatus(req, res){
        const { id } = req.body

        const task = {
            done: req.body.done == '0' ? true : false
        }

        await Task.update(task, {where: { id: id}})

        res.redirect("/tasks")
    }
}