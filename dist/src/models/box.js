"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
const BoxModel = database_1.default.define('boxes', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_local: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre_visita: {
        type: sequelize_1.DataTypes.STRING
    },
    peso_local: {
        type: sequelize_1.DataTypes.STRING
    },
    peso_visita: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.default = BoxModel;
//# sourceMappingURL=box.js.map