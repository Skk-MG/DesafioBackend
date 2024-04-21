const UserModel = require("../models/user.model");

class UsersDao {

    async getAll() {
        return await UserModel.find().lean();
    }

    async getById(id) {
        return await UserModel.findOne({_id:id}).lean();
    }

    async getByProperty(property, name){
        let opts = {}
        opts[property] = name; 
        let result = await UserModel.findOne(opts).lean()
        return result; 
    }

    async create(user) {
        return await UserModel.create(user);
    }

    async update(id, userList) {
        return await UserModel.updateOne({_id:id}, userList);
    }

    async delete(id) {
        return await UserModel.deleteOne({_id:id});
    }
}

module.exports = UsersDao;