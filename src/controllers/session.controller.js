const UserDTO = require('../dao/DTOs/UserDTO');
const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils');

class SessionController {

    static async registerUser (req, res) {
        res.send({status: 'success', message: 'Usuario Registrado'});
    }
    
    static async getRegisterFailure (req, res) {
        res.status(401).send({status: 'error', error: 'Error de autenticacion'});
    }

    static async login (req, res) {
   
        const user = req.user;
        req.session.user = {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart
        }
       
        res.send({status: 'success', payload: req.session.user});
    }
    
    static async getLoginFailure (req, res) {
        res.status(401).send({status: 'error', error: 'Error al iniciar sesion'});
    }

    static async logout (req, res) {

        req.session.destroy((err) => {
            if(err) return res.status(500).send('Hubo un error al destruir la sesion')
        })
    
        res.redirect('/login')
    }

    static async resetPassword (req, res) {

    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).send({status: 'error', error: 'Falta Informacion'});
    }

    const user = await UserModel.findOne({email});
    if (!user) {
        return res.status(401).send({status: 'error', error: 'Usuario no Encontrado'});
    }

    const hashedPassword = createHash(password);
    await UserModel.updateOne({_id: user._id}, {$set: {password: hashedPassword}});

    res.send({status: 'Success', message: 'Restauracion de contraseña exitosa'})

    }

    static async processGithub (req, res) {

        req.session.user = {
            name: req.user.firstName,
            email: req.user.email,
            age: req.user.age
        }
       
        res.redirect('/products')
    }

    static async getCurrent (req, res) {
        const user = req.session.user;
        const userDTO = new UserDTO(user);
        res.send({payload: userDTO});
    }
    
}

module.exports = SessionController;