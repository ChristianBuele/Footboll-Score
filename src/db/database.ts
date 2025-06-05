import { Sequelize } from 'sequelize';

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
        database: 'postgres',
        username: 'postgres.oatgpmvccoxkfpjbfdum',
        password: 'Ethan30.03.1997LEG',
        host: 'aws-0-us-east-2.pooler.supabase.com',
        port:6543,
        dialect: 'postgres',
        logging: true
    }
);

export default db;