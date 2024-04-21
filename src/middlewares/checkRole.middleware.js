const checkRole = (role) => (req, res, next) => {
    const user = req.user;

    if(user.role != role) {
        return res.status(403).send({status: 'Error', error: `Acceso no autorizado, no eres ${role}`})
    }

    next();
}

const checkAdmin = (req, res, next) => {
    const user = req.user;

    if(user.role != 'admin') {
        return res.status(403).send({status: 'Error', error: `Acceso no autorizado, no eres ${role}`})
    }

    next();
}

const checkUser = (req, res, next) => {
    const user = req.user;

    if(user.role != 'usuario') {
        return res.status(403).send({status: 'Error', error: `Acceso no autorizado, no eres ${role}`})
    }

    next();
}

module.exports = checkRole;