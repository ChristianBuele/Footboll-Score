import {DataTypes} from 'sequelize';
import db from '../db/database';
import Category from './category';

const Match=db.define('Matches',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    date:{
        type:DataTypes.STRING
    },
    location:{
        type:DataTypes.STRING
    },
    minutes:{
        type:DataTypes.INTEGER
    },
    startTime:{
        type:DataTypes.DATE
    },
    idCategory:{
        type:DataTypes.INTEGER
    },
    active:{
        type:DataTypes.BOOLEAN
    },
    createdAt:{
        type:DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE
    }
});

Match.hasOne(Category,{
    foreignKey:"id"
});

export default Match;
