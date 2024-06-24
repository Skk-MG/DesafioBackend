const MailingService = require("./mailing.service");

const mailingService = new MailingService();

const TOLERABLE_TIME = 60 * 24 * 2;

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

    async getByProperty(property, value){
        const item = await this.dao.getByProperty(property, value); 
        if(!item) throw { message:`No hay un item con la propiedad ${property} = ${value}`, status:400 }
        return item;
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

    async setLastConnection(id){
        const user = await this.dao.getById(id);
        await this.update(id, {last_connection: new Date()})
    }

    async addDocuments(id, files){
        const user = await this.dao.getById(id);
        let documents = user.documents || []; 
        
        documents = [...documents,...(files.map(file=>{
            return {name: file.originalname, reference: file.path.split('public')[1].replace(/\\/g,'/')}
        }))]

        return await this.update(id, {documents: documents})
    }

    async addProfilePicture(id, file){
        await this.getById(id);
        return await this.update(id, {profile_picture: file.path.split('public')[1].replace(/\\/g,'/')})
    }

    async deleteInactiveUsers() {
        const users = await this.getAll();
        const now = new Date();
        let deletedCount = 0;

        for(const user of users){
            if(user.last_connection){
                if(this.getMinutesDifference(now, user.last_connection) > TOLERABLE_TIME){
                    await this.delete(user._id);
                    await mailingService.sendDeletedAccountMail(user.firstName, user.email)
                    deletedCount++;
                }
            }
        }

        return deletedCount;
    }

    getMinutesDifference(now, last_connection){
        let milisecondsDif = now - last_connection
        let minutes =  Math.round((milisecondsDif/1000)/60)

        return minutes; 
    }
}

module.exports = UsersService;