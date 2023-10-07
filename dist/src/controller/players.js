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
exports.postLineupByTeam = exports.postChange = exports.postTarget = exports.putPlayer = exports.postPlayer = exports.getPlayersByTeamId = void 0;
const team_1 = __importDefault(require("../models/team"));
const player_1 = __importDefault(require("../models/player"));
const getPlayersByTeamId = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const team = yield team_1.default.findByPk(id);
    if (!team) {
        return resp.status(404).json({
            msg: `Team with id ${id} not found`
        });
    }
    const players = yield player_1.default.findAll({
        where: {
            idTeam: id
        }
    });
    resp.json({ players });
});
exports.getPlayersByTeamId = getPlayersByTeamId;
const postPlayer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const player = yield player_1.default.create(body);
        resp.json(player);
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
});
exports.postPlayer = postPlayer;
const putPlayer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const player = yield player_1.default.findByPk(id);
        if (!player) {
            return resp.status(404).json({
                msg: `Player with id ${id} not found`
            });
        }
        yield player.update(body);
        resp.json(player);
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
});
exports.putPlayer = putPlayer;
const postTarget = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    var socket = req.app.get('socketio');
    console.log(body);
    socket.emit('MatchTarget' + body.matchId, body);
    resp.json({ msg: "Tarjeta mostrada correctamente" });
});
exports.postTarget = postTarget;
const postChange = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    var socket = req.app.get('socketio');
    console.log(body);
    socket.emit('MatchChange' + body.matchId, body);
    resp.json({ msg: "Cambio existoso correctamente" });
});
exports.postChange = postChange;
const postLineupByTeam = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    var socket = req.app.get('socketio');
    const titulares = yield player_1.default.findAll({
        where: [
            { idTeam: body.idTeam },
            { present: true },
            { titular: true }
        ]
    });
    const suplentes = yield player_1.default.findAll({
        where: [
            { idTeam: body.idTeam },
            { present: true },
            { titular: false }
        ]
    });
    const team = yield team_1.default.findByPk(body.idTeam);
    socket.emit('MatchLineup' + body.matchId, { titulares, suplentes, team });
    resp.json({ msg: "Alineacion mostrada existosamente", team });
});
exports.postLineupByTeam = postLineupByTeam;
//# sourceMappingURL=players.js.map