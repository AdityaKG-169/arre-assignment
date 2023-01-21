const { set, connect, connection } = require('mongoose');

const serverConfig = require('./server.config');

set('strictQuery', true);
connect(serverConfig.mongoUri);
const db = connection;

module.exports = db;
