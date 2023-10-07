import {Sequelize} from 'sequelize';

const db = new Sequelize(
    {
        database:'postgres',
        username:'postgres',
        password:'Buele30.03.1997',
        host:'localhost',
        dialect:'postgres',
        logging:true
    }
);


export default db;