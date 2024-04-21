class BaseMemoryDAO {
    static id = 0; 
    constructor(){
        this.data = []
    }

    async getAll(){
        return this.data;
    }

    async getById(id){
        return this.data.find(d=>d._id == id)
    }

    async getByProperty(property, value){
        const result = this.data.find(d=>value == d[property]);
        return result; 
    }

    async create(product){
        product._id = ++ BaseMemoryDAO.id;
        this.data.push(product);  
        return product;  
    }

    async update(id, product){ 
        let index = this.data.findIndex(d=>_id == id)
        if(index <0){
            throw new Error('La ID no existe')
        }
        this.data[index] = {...this.data[index],...product};
        return this.data[index];
    } 

    async delete(id){
        let index = this.data.findIndex(d=>_id == id)
        this.data.splice(index, 1);
        return this.data; 
    }
}

module.exports = BaseMemoryDAO;