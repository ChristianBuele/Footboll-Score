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
exports.postTeamMatch = exports.getTeamMatches = void 0;
const MatchTeams_1 = __importDefault(require("../models/MatchTeams"));
const team_1 = __importDefault(require("../models/team"));
const match_1 = __importDefault(require("../models/match"));
const category_1 = __importDefault(require("../models/category"));
const getTeamMatches = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const teamMatches = yield MatchTeams_1.default.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    let data = [];
    for (const teamMatch of teamMatches) {
        const local = yield team_1.default.findByPk(teamMatch.dataValues['idTeamLocal']);
        const visit = yield team_1.default.findByPk(teamMatch.dataValues['idTeamVisit']);
        const match = yield match_1.default.findByPk(teamMatch.dataValues['idMatch']);
        const category = yield category_1.default.findByPk(match === null || match === void 0 ? void 0 : match.dataValues['idCategory']);
        data.push({ teamMatch, local, visit, category });
    }
    resp.json(data);
});
exports.getTeamMatches = getTeamMatches;
const postTeamMatch = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, location, minutes, categorie, teamLocal, teamVisit } = req.body;
    const match = yield match_1.default.create({
        date,
        location,
        minutes,
        startTime: new Date(),
        idCategory: categorie.id,
        active: true
    });
    const teamMatch = yield MatchTeams_1.default.create({
        idTeamLocal: teamLocal.id,
        idTeamVisit: teamVisit.id,
        idMatch: match.get('id')
    });
    resp.json({ teamMatch, match });
});
exports.postTeamMatch = postTeamMatch;
//# sourceMappingURL=matchTeam.js.map