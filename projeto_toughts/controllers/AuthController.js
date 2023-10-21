const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const {name, email, password, confirmPassword} = req.body

        //validations
        //password match validation
        if(password !== confirmPassword){
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        const checkIfUserExists = await User.findAll({where: {email: email}, raw: true})
        if(checkIfUserExists.length){
            req.flash('message', 'E-mail já cadastrado!')
            return res.render('auth/register')
        }

        const salt = await bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try{
            const createdUser = await User.create(user)

            // initialize the session
            req.session.userId = createdUser.id
            req.flash('message', 'Usuário cadastrado com sucesso!')

            req.session.save(() => {
                return res.redirect('/')
            })

        }catch(e){
            console.error(e)
        }
    }

    static logout(req, res){
        req.session.destroy(() => {
            res.redirect('/login')
        })
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        const user = await User.findOne({where: {email: email}, raw: true})
        if(!user){
            req.flash('message', 'Usuário não encontrado!')
            return res.render('auth/login')
        }

        const passwordmatch = bcrypt.compareSync(password, user.password)
        if(!passwordmatch){
            req.flash('message', 'Senha inválida!')
            return res.render('auth/login')
        }

        // initialize the session
        req.session.userId = user.id
        req.session.save(() => {
            return res.redirect('/')
        })
    }
}