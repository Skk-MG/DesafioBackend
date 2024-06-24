class UserDTO {
    constructor(user){
        this.firstName = user.firstName; 
        this.lastName = user.lastName; 
        this.email = user.email;  
        this.age = user.age;  
        this.role = user.role;
        this.last_connection = user.last_connection;
    }
}

module.exports = UserDTO; 