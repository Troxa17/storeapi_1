import  Sequelize  from "sequelize";
import Database from '../database.js'


const category=Database.difine('category',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sport:Sequelize.STRING,
    fashion:Sequelize.STRING,
    gadgets:Sequelize.STRING,
    media:Sequelize.STRING
})


export default category;