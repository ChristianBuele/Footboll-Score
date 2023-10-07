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
exports.getTeamMatches = void 0;
const MatchTeams_1 = __importDefault(require("../models/MatchTeams"));
const team_1 = __importDefault(require("../models/team"));
const getTeamMatches = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const teamMatches = yield MatchTeams_1.default.findAll();
    let data = [];
    for (const teamMatch of teamMatches) {
        const local = yield team_1.default.findByPk(teamMatch.dataValues['idTeamLocal']);
        const visit = yield team_1.default.findByPk(teamMatch.dataValues['idTeamVisit']);
        data.push({ teamMatch, local, visit });
    }
    resp.json(data);
});
exports.getTeamMatches = getTeamMatches;
//# sourceMappingURL=matchTeam.js.map