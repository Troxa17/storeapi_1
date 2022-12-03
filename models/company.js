import Sequelize from 'sequelize';
import Database from '../database.js';

const category=Database.define('category',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    clothes:Sequelize.STRING,
    electric:Sequelize.STRING,
    media:{type:Sequelize.STRING,allowNull:false},
    sport:{type:Sequelize.STRING,allowNull:false},
    
})

export default category;