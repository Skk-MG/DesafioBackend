const { usersService } = require("../repositories");

class UsersController {

    static async changeRole(req, res) {

        const userId = req.params.userId;

        try {
            const user = await usersService.getById(userId);

            if(!['usuario', 'premium'].includes(user.role)){
                throw new Error('El usuario tiene un rol invalido')
            }

            if(user.role == 'usuario') {
                user.role = 'premium'
            } else {
                user.role = 'usuario'
            }

            await usersService.update(user._id.toString(), {$set: {role: user.role}})

            res.send({status: 'success'})
        } catch (error) {
            res.status(500).send({status: 'error', error: error.message})
        }
    }
}

module.exports = UsersController;