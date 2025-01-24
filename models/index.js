// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
}); // SQLite database

// Import models
const Job = require('./jobs')(sequelize, DataTypes);
const User = require('./users')(sequelize, DataTypes);
const Notification = require('./notification')(sequelize, DataTypes);

// Export models and sequelize
module.exports = {
    sequelize,
    User,
    Job,
    Notification
};
