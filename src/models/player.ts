import {DataTypes} from 'sequelize';
import db from '../db/database';
import Team from './team';

const Player=db.define('Players',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    number:{
        type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING
    },
    titular:{
        type:DataTypes.BOOLEAN
    },
    present:{
        type:DataTypes.BOOLEAN
    },
    createdAt:{
        type:DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE
    }
});

export default Player;