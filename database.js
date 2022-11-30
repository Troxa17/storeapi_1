import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    //The name of database
    'storedb',
    //The username of database
    'root',
    //The password of database
    'troxa6996',
    //2 objects dialect and host
    {
        dialect:"mysql",
        host:"localhost"

    }
);

export default sequelize;
