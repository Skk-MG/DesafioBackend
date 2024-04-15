const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mongoConnectionLink: process.env.MONGO_CONNECTION_LINK,
    sessionSecret: process.env.SESSION_SECRET,
    port: process.env.PORT_CONNECTION
}