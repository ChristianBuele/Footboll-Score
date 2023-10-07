import {DataTypes} from 'sequelize';
import db from '../db/database';
import Match from './match';
import Player from './player';
import Team from './team';

const Score=db.define('Scores',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    idMatch:{
        type:DataTypes.INTEGER
    },
    idPlayer:{
        type:DataTypes.INTEGER
    },
    idTeam:{
        type:DataTypes.INTEGER
    },
    scoreTime:{
        type:DataTypes.DATE
    }
});

Score.hasOne(Match);
Score.hasOne(Player);
Score.hasOne(Team);

export default Score;