import Sequelize from 'sequelize';
import Database from '../database.js';


const users=Database.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    email:{type:Sequelize.STRING,allowNull:false},
    password:{type:Sequelize.STRING,allowNull:false},
    isAproved:{type:Sequelize.BOOLEAN},
    passcode:Sequelize.INTEGER
})

export default users;