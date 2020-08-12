require('dotenv').config();

const { PASSWORD_SALT, MONGODB_PROD_URI } = process.env;

module.exports = { PASSWORD_SALT, MONGODB_PROD_URI };
