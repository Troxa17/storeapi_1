import Sequelize from 'sequelize';
import Database from '../database.js';

const category=Database.define('category',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nameCompany:Sequelize.STRING,
    type:Sequelize.STRING,
    year:{type:Sequelize.STRING,allowNull:false},
    location:{type:Sequelize.STRING,allowNull:false},
    
})

export default category;