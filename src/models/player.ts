import {DataTypes} from 'sequelize';
import db from '../db/database';
import Team from './team';

const Player=db.define('Players',{
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

Player.belongsTo(Team, { foreignKey: 'idTeam' });
export default Player;