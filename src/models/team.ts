import {DataTypes} from 'sequelize';
import db from '../db/database';
import Player from './player';
import Category from './category';

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
    },
    idcategory:{
        type:DataTypes.INTEGER
    }
});

Team.hasMany(Player,{
    foreignKey:'idTeam',
    as:'items'
})

Team.hasMany(Category,{
    foreignKey:'id'
});

export default Team;