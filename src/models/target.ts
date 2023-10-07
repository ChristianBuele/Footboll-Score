import {DataTypes} from 'sequelize';
import db from '../db/database';

const Target=db.define('Targets',{
    name:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE
    }
});

export default Target;