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
exports.putTeam = exports.postTeam = exports.getTeams = void 0;
const team_1 = __importDefault(require("../models/team"));
const getTeams = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield team_1.default.findAll({
        order: [['id', 'DESC']]
    });
    resp.json({ teams });
});
exports.getTeams = getTeams;
const postTeam = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const team = yield team_1.default.create(body);
        resp.json(team);
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({
            msg: 'Verify data',
            error
        });
    }
});
exports.postTeam = postTeam;
const putTeam = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const team = yield team_1.default.findByPk(id);
        if (!team) {
            return resp.status(404).json({
                msg: `Team with id ${id} not found`
            });
        }
        yield team.update(body);
        resp.json(team);
    }
    catch (error) {
        resp.status(500).json({
            msg: 'Verify data'
        });
    }
});
exports.putTeam = putTeam;
//# sourceMappingURL=team.js.map