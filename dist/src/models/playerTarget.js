"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const match_1 = __importDefault(require("./match"));
const target_1 = __importDefault(require("./target"));
const player_1 = __importDefault(require("./player"));
const sequelize_1 = require("sequelize");
const PlayerTarget = database_1.default.define('PlayerTarget', {
    idPlayer: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idTarget: {
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
}, {
    tableName: 'PlayerTarget'
});
PlayerTarget.hasMany(player_1.default, {
    foreignKey: 'id',
    sourceKey: 'idPlayer'
});
PlayerTarget.hasMany(target_1.default, {
    foreignKey: 'id'
});
PlayerTarget.hasMany(match_1.default, {
    foreignKey: 'id'
});
exports.default = PlayerTarget;
//# sourceMappingURL=playerTarget.js.map