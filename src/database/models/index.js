const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const db = {};

let sequelize;
if (process.env.DATABASE_URL && config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);

}

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));

    if(typeof model === 'function') {
      db[model.name] = model;
    } else if(typeof model === 'object')  {
      Object.keys(model).forEach((aModel) => {
        db[aModel] = model[aModel];
      });
    }
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
