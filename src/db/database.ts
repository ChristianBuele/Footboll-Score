import {Sequelize} from 'sequelize';

// const dbdev = new Sequelize(
//     {
//         database:'postgres',
//         username:'postgres',
//         password:'Buele30.03.1997',
//         host:'localhost',
//         dialect:'postgres',
//         logging:true
//     }
// );
const db = new Sequelize(
    {
        database:'postgres',
        username:'postgres',
        password:'Ethan30.03.1997LEG',
        host:'db.oatgpmvccoxkfpjbfdum.supabase.co',
        dialect:'postgres',
        logging:true
    }
);



export default db;