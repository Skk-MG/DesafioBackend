const { Command } = require('commander');
const dotenv = require('dotenv');

dotenv.config();

// Commander
const program = new Command();
program.option('-p, --persistence <persistence>', 'La persistencia seleccionada es', 'MONGO');
const options = program.opts();
program.parse(process.argv);

module.exports = {
    mongoConnectionLink: process.env.MONGO_CONNECTION_LINK,
    sessionSecret: process.env.SESSION_SECRET,
    port: process.env.PORT_CONNECTION,
    persistence: options.persistence
};