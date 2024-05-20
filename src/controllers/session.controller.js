const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const UserDTO = require('../dao/DTOs/UserDTO');
const UserModel = require('../dao/models/user.model');
const MailingService = require('../services/mailing.service');
const CustomError = require('../utils/errorHandling/customError');
const ErrorTypes = require('../utils/errorHandling/errorTypes');
const { usersService } = require('../repositories');
const { createHash, isValidPassword } = require('../utils/utils');

const mailingService = new MailingService();

class SessionController {

    static async registerUser (req, res) {
        req.logger.info('Usuario creado con exito')
        res.send({status: 'success', message: 'Usuario Registrado'});
    }
    
    static async getRegisterFailure (req, res, next) {
        console.log('ERROR', req.error)
        try {
            throw new CustomError({
                name: "Registro invalido",
                cause: "Registracion invalida",
                message: "Hubo un problema al registrar el usuario",
                code: ErrorTypes.INVALID_TYPE_ERROR
            })
        } catch (error) {
            next(next)
        }
        // res.status(401).send({status: 'error', error: 'Error de autenticacion'});
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

    // static async resetPassword (req, res) {

    // const { email, password } = req.body;
    // if ( !email || !password) {
    //     return res.status(400).send({status: 'error', error: 'Falta Informacion'});
    // }

    // const user = await UserModel.findOne({email});
    // if (!user) {
    //     return res.status(401).send({status: 'error', error: 'Usuario no Encontrado'});
    // }

    // const hashedPassword = createHash(password);
    // await UserModel.updateOne({_id: user._id}, {$set: {password: hashedPassword}});

    // res.send({status: 'Success', message: 'Restauracion de contraseña exitosa'})

    // }

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

    static async resetPassword(req, res){
        try {
            const {email} = req.body; 
            let user = await usersService.getByProperty("email",email)
            const passwordResetToken = jwt.sign(user,jwtSecret,{expiresIn:'1h'}) 

            await mailingService.sendPasswordResetMail(user, email, passwordResetToken)
            res.send({payload: true})
        } catch (error) {
            res.status(500).send({status:'error', error: error.message})
        }
    }   

    static async verifyToken(req, res){
        const {passwordResetToken} = req.params; 

        try {
            jwt.verify(passwordResetToken, jwtSecret, (error)=>{
                if(error){
                    return res.redirect('/resetPassword')
                }
                res.redirect('/changePassword')
            })
        } catch (error) {
            res.status(500).send({status:'error', error: error.message})
        }
    }  

    static async changePassword(req, res){

        try {
            const {email, password} = req.body; 
            let user = await usersService.getByProperty("email",email)
            if(isValidPassword(user, password)){
                return res.status(400).send({status:'error', error:'Misma Contraseña'})
            }

            user.password = password;

            await usersService.update(user._id.toString(), {$set: {password: createHash(user.password)}})

            res.send({status: 'success'})
        } catch (error) {
            console.log("ERROR", error)
            res.status(500).send({status:'error', error: error.message})
        }
    }  
    
}

module.exports = SessionController;