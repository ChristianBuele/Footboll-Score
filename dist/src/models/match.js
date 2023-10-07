"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
const category_1 = __importDefault(require("./category"));
const Match = database_1.default.define('Matches', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING
    },
    location: {
        type: sequelize_1.DataTypes.STRING
    },
    minutes: {
        type: sequelize_1.DataTypes.INTEGER
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE
    },
    idCategory: {
        type: sequelize_1.DataTypes.INTEGER
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
});
Match.hasOne(category_1.default, {
    foreignKey: "id"
});
exports.default = Match;
//# sourceMappingURL=match.js.map