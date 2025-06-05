import {DataTypes} from 'sequelize';
import db from '../db/database';


const BoxModel =db.define('boxes',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nombre_local:{
        type:DataTypes.STRING
    },
    nombre_visita:{
        type:DataTypes.STRING
    },
    peso_local:{
        type:DataTypes.STRING
    },
    peso_visita:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE
    }
});

export default BoxModel;