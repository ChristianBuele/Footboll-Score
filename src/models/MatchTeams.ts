import {DataTypes} from 'sequelize';
import db from '../db/database';
import Match from './match';
import Team from './team';

const MatchTeams=db.define('MatchTeams',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idTeamLocal:{
        type:DataTypes.INTEGER
    },
    idTeamVisit:{
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
});

MatchTeams.hasOne(Match, { foreignKey: 'id' });
MatchTeams.hasOne(Team,{ foreignKey: 'id' })


export default MatchTeams;