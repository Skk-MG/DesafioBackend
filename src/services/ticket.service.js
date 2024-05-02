const CustomError = require("../utils/errorHandling/customError");
const ErrorTypes = require("../utils/errorHandling/errorTypes");
const { getIdErrorInfo } = require("../utils/errorHandling/info");

class TicketService {
    constructor(dao){
        this.dao = dao;
    }

    async getAll(){
        return await this.dao.getAll() 
    }

    async getById(id){    

        try {
            const ticket = await this.dao.getById(id); 
            return ticket;  
        } catch (error) {
      
            throw new CustomError({
                name: 'Error en la busqueda del ticket',
                cause: getIdErrorInfo(id),
                message: 'Error al buscar el ticket, ID inexistente o invalida',
                code: ErrorTypes.INVALID_PARAM_ERROR
            })
        }
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