const {Router} = require('express');
const passport = require('passport');
const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils');

const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/registerFailure'}), async (req,res) => {
    res.send({status: 'success', message: 'Usuario Registrado'});
})

router.get('/registerFailure', (req, res) => {
    res.status(401).send({status: 'error', error: 'Error de autenticacion'});
})

router.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/loginFailure'}), async (req,res) => {
   
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
})

router.get('/loginFailure', (req, res) => {
    res.status(401).send({status: 'error', error: 'Error al iniciar sesion'});
})

router.get('/logout', (req,res) => {

    req.session.destroy((err) => {
        if(err) return res.status(500).send('Hubo un error al destruir la sesion')
    })

    res.redirect('/login')
})

router.post('/resetPassword', async (req, res) => {

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

})

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {

    req.session.user = {
        name: req.user.firstName,
        email: req.user.email,
        age: req.user.age
    }
   
    res.redirect('/products')
})

router.get('/current', (req, res) => {
    const user = req.session.user;
    res.send({payload: user});
})

module.exports = router;