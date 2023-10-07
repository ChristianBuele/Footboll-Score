"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamMatch = void 0;
const match_1 = __importDefault(require("../models/match"));
const MatchTeams_1 = __importDefault(require("../models/MatchTeams"));
const team_1 = __importDefault(require("../models/team"));
const getTeamMatch = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const match = yield match_1.default.findByPk(id);
    if (!match) {
        return resp.status(404).json({
            msg: `Match with id ${id} not found`
        });
    }
    const teamMatch = yield MatchTeams_1.default.findAll({
        where: { idMatch: id }
    });
    const idTeamList = teamMatch.map(team => team.get('idTeam'));
    const teams = yield team_1.default.findAll({
        where: {
            id: idTeamList
        }
    });
    return resp.json({
        teams,
        match
    });
});
exports.getTeamMatch = getTeamMatch;
//# sourceMappingURL=teamMatch.js.map