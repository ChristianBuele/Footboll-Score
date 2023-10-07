"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const match_1 = __importDefault(require("./match"));
const target_1 = __importDefault(require("./target"));
const player_1 = __importDefault(require("./player"));
const PlayerTarget = database_1.default.define('PlayerTarget', {});
PlayerTarget.belongsTo(player_1.default, { foreignKey: 'idPlayer' });
PlayerTarget.belongsTo(target_1.default, { foreignKey: 'idTarget' });
PlayerTarget.belongsTo(match_1.default, { foreignKey: 'idMatch' });
exports.default = PlayerTarget;
//# sourceMappingURL=playerTarget.js.map