const {Router} = require('express');
const UserModel = require('../dao/models/user.model');

const router = Router();

router.post('/register', async (req,res) => {
    let { firstName, lastName, email, age, password, role } = req.body;

    if ( !firstName || !lastName || !email || !age || !password) {
        return res.status(400).send({status: 'error', error: 'Falta Informacion'})
    }

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123' ) {
        role = 'admin'
    } else {
        role = 'usuario'
    }

    await UserModel.create({ firstName, lastName, email, age, password, role });
    res.send({status: 'success', message: 'Usuario Registrado'});
})

router.post('/login', async (req,res) => {

    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).send({status: 'error', error: 'Falta Informacion'});
    }

    const user = await UserModel.findOne({email, password});
    if (!user) {
        return res.status(401).send({status: 'error', error: 'Credenciales Incorrectas'});
    }

    req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        role: user.role
    };

    res.send({status: 'success', payload: req.session.user});
})

router.get('/logout', (req,res) => {

    req.session.destroy((err) => {
        if(err) return res.status(500).send('Hubo un error al destruir la sesion')
    })

    res.redirect('/login')
})

module.exports = router;