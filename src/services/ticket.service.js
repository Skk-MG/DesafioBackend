class TicketService {
    constructor(dao){
        this.dao = dao;
    }

    async getAll(){
        return await this.dao.getAll() 
    }

    async getById(id){    
        const ticket = await this.dao.getById(id); 
        if(!ticket) throw { message:`Np hay un ticket con la ID ${id}`, status:400 }
        return ticket;
    }

    async create(ticket){
        return await this.dao.create(ticket);
    }

    async update(id, ticket){
        await this.dao.getById(id);
        return await this.dao.update(id, ticket);
    }

    async delete(id){
        await this.dao.getById(id);
        return await this.dao.delete(id);
    }

    async generate(email, totalAmount){
        const ticket = await this.dao.create({
            code: `${Math.random()}`, 
            purchase_datetime: new Date().toLocaleString(),
            amount: totalAmount,
            purchaser: email
        })

        return ticket; 
    }
}

module.exports = TicketService;