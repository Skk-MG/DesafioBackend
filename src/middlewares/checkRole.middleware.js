const checkRole = (roles) => (req, res, next) => {
    const user = req.user;

    if(!Array.isArray(roles)) {
        roles = [roles]
    }

    if(!roles.includes(user.role)) {
        return res.status(403).send({status: 'Error', error: `Acceso no autorizado, no eres ${roles}`})
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