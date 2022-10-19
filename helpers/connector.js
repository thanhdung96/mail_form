var mongooseConnector = require('mongoose');
require('dotenv').config();

// connect to mongodb
let connectionString = 'mongodb+srv://MONGO_USER:MONGO_PASSWORD@MONGO_ADDRESS/?retryWrites=true&w=majority';
connectionString = connectionString.replace('MONGO_USER', process.env.MONGO_USER);
connectionString = connectionString.replace('MONGO_PASSWORD', process.env.MONGO_PASSWORD);
connectionString = connectionString.replace('MONGO_ADDRESS', process.env.MONGO_ADDRESS);
mongooseConnector.connect(connectionString);

module.exports = mongooseConnector;
