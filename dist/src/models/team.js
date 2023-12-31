"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
const player_1 = __importDefault(require("./player"));
const category_1 = __importDefault(require("./category"));
const Team = database_1.default.define('Teams', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    color: {
        type: sequelize_1.DataTypes.STRING
    },
    idcategory: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
Team.hasMany(player_1.default, {
    foreignKey: 'idTeam',
    as: 'items'
});
Team.hasMany(category_1.default, {
    foreignKey: 'id'
});
exports.default = Team;
//# sourceMappingURL=team.js.map