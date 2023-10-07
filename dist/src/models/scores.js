"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
const match_1 = __importDefault(require("./match"));
const player_1 = __importDefault(require("./player"));
const team_1 = __importDefault(require("./team"));
const Score = database_1.default.define('Scores', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idMatch: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idPlayer: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idTeam: {
        type: sequelize_1.DataTypes.INTEGER
    },
    scoreTime: {
        type: sequelize_1.DataTypes.DATE
    }
});
Score.hasOne(match_1.default);
Score.hasOne(player_1.default);
Score.hasOne(team_1.default);
exports.default = Score;
//# sourceMappingURL=scores.js.map