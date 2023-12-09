import db from '../db/database';
import Match from './match';
import Target from './target';
import Player from './player';
import { DataTypes } from 'sequelize';

const PlayerTarget = db.define('PlayerTarget', {
    idPlayer:{
        type:DataTypes.INTEGER
    },
    idTarget:{
        type:DataTypes.INTEGER
    },
    idMatch:{
        type:DataTypes.INTEGER
    },
    createdAt:{
        type:DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE
    }
},
{
    tableName:'PlayerTarget'
});


PlayerTarget.hasMany(Player,{
    foreignKey:'id',
    sourceKey:'idPlayer'
});

PlayerTarget.hasMany(Target,{
    foreignKey:'id'
});

PlayerTarget.hasMany(Match,{
    foreignKey:'id'
});

export default PlayerTarget;