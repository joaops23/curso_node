const Tought = require("../models/Tought")
const User = require("../models/User")
const { Op } = require("sequelize")

module.exports = class ToughtController{
    static async showToughts(req, res){

        let search = ''

        if(req.query.search) {
            search = req.query.search
        }

        let order = "DESC"
        if(req.query.order === 'old')
            order = "ASC"
        else 
            order = "DESC"

        const data = await Tought.findAll({
            include: User,
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
            order: [['createdAt', order]]
        });

        const toughts = data.map((result) => result.get({plain: true}))

        res.render('toughts/home', {toughts, search, toughtsLen: toughts.length > 0 ? toughts.length : false })
    }

    static async dashboard(req, res){
        const {userId} = req.session

        const user = await User.findByPk(userId, {
            include: Tought,
            plain: true
        })

        if(!user) {
            return res.redirect('/login')
        }
        
        const toughts = user.Toughts.map((result) => result.dataValues)
        
        const emptyToughts = toughts.length === 0 ? true : false
        
        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static async createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userId
        }

        try{
            await Tought.create(tought)
    
            req.flash("message", "Pensamento criado com sucesso!")
    
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(err){
            console.error(err)
        }
    }

    static async removeTought(req, res) {
        const id = req.body.id
        const userId = req.session.userId

        try{
            await Tought.destroy({where: {id: id, UserId: userId}})
            req.flash("message", "Pensamento Removido com sucesso!")

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.error(err)
        }
    }

    static async updateTought(req, res) {
        const id = req.params.id
        const userId = req.session.userId
        const tought = await Tought.findByPk(id, {raw: true})

        console.log(tought)

        res.render('toughts/edit', {tought})
    }

    static async updateToughtPost(req, res) {
        const id = req.body.id
        const tought = {
            title: req.body.title
        }

        try{
            await Tought.update(tought, {where: {id: id}})
            req.flash("message", "Pensamento atualizado com sucesso!")

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.error(err)
        }
    }
}