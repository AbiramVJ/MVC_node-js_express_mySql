
import Sequelize from "sequelize";

const sequelize = new Sequelize('node-complete', 'root', 'Password@123', {
  dialect: 'mysql',
  host: 'localhost'
});


export default sequelize;
