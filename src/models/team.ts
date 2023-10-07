import {DataTypes} from 'sequelize';
import db from '../db/database';

const Team=db.define('Teams',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    name:{
        type:DataTypes.STRING
    },
    color:{
        type:DataTypes.STRING
    }
});

export default Team;