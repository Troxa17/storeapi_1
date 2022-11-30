import Sequelize from 'sequelize';
import Database from '../database.js';


const users=Database.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName:{ type:Sequelize.STRING},
    lastName:{type:Sequelize.STRING},
    email:{type:Sequelize.STRING,allowNull:false},
    password:{type:Sequelize.STRING,allowNull:false},
    isAproved:{type:Sequelize.BOOLEAN}
})

export default users;