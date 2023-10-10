import {DataTypes} from 'sequelize';
import db from '../db/database';
import Player from './player';

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

Team.hasMany(Player,{
    foreignKey:'idTeam',
    as:'items'
})

export default Team;