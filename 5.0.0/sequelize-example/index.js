const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('example', 'root', 'y2mqXt8gX8M5guG7', {
  host: 'localhost',
  dialect: 'mysql'
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

main();
