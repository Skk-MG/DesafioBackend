class UsersService {

    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {

        const found = await this.dao.getById(id);

        if(!found) {
            return console.log("Error, usuario no encontrado");
        } else {
            return await this.dao.getById(id);
        }
    }

    async create(user) {
        return await this.dao.create(user);
    }

    async update(id, user) {
        const found = await this.dao.getById(id);

        if(!found) {
            return console.log("Error, usuario no encontrado");
        }

        return await this.dao.update(id, user);
    }

    async delete(id) {
        const found = await this.dao.getById(id);

        if(!found) {
            return console.log("Error, usuario no encontrado");
        }
        
        return await this.dao.delete(id);
    }
}

module.exports = UsersService;