"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
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
const db = new sequelize_1.Sequelize({
    database: 'postgres',
    username: 'postgres.ridzhgpoiefbfjgqkhex',
    password: 'Lucas30.03.199797S',
    host: 'aws-0-us-east-1.pooler.supabase.com',
    dialect: 'postgres',
    logging: true
});
exports.default = db;
//# sourceMappingURL=database.js.map