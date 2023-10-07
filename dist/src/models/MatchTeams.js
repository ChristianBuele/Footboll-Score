"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
const match_1 = __importDefault(require("./match"));
const team_1 = __importDefault(require("./team"));
const MatchTeams = database_1.default.define('MatchTeams', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idTeamLocal: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idTeamVisit: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idMatch: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
});
MatchTeams.hasOne(match_1.default, { foreignKey: 'id' });
MatchTeams.hasOne(team_1.default, { foreignKey: 'id' });
exports.default = MatchTeams;
//# sourceMappingURL=MatchTeams.js.map