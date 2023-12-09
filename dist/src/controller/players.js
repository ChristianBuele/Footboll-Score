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
exports.postScore = exports.deletePlayer = exports.postMatchPlayer = exports.getPlayersByMatch = exports.postLineupByTeam = exports.postChange = exports.postTarget = exports.putPlayer = exports.postPlayer = exports.getPlayersByTeamId = void 0;
const team_1 = __importDefault(require("../models/team"));
const player_1 = __importDefault(require("../models/player"));
const MatchTeams_1 = __importDefault(require("../models/MatchTeams"));
const playerTarget_1 = __importDefault(require("../models/playerTarget"));
const scores_1 = __importDefault(require("../models/scores"));
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
    const target = body.isYellow ? 1 : 2;
    const targetData = {
        idPlayer: body.player.id,
        idTarget: target,
        idMatch: body.matchId
    };
    console.log('Llega dato de una tarjeta amarilla:', body);
    socket.emit('MatchTarget' + body.matchId, body);
    try {
        const playerTarget = yield playerTarget_1.default.create(targetData);
        resp.json(playerTarget);
    }
    catch (error) {
        resp.status(500).json({
            msg: 'Verify data',
            error: error
        });
    }
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
    socket.emit('MatchLineup' + body.matchId, { titulares, suplentes, team, show: body.show });
    resp.json({ msg: "Alineacion mostrada existosamente", team });
});
exports.postLineupByTeam = postLineupByTeam;
const getPlayersByMatch = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const match = yield MatchTeams_1.default.findByPk(id);
        if (!match) {
            return resp.status(404).json({ error: 'Partido no encontrado' });
        }
        const teamPlayers = yield team_1.default.findAll({
            include: [
                {
                    model: player_1.default,
                    required: true,
                    as: 'items'
                }
            ],
            where: {
                id: [match.get('idTeamLocal'), match.get('idTeamVisit')]
            },
        });
        resp.json({ teamPlayers });
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getPlayersByMatch = getPlayersByMatch;
const postMatchPlayer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    var socket = req.app.get('socketio');
    socket.emit('MatchPlayer' + body.matchId, body.player);
    resp.json({ msg: "Jugador mostrado existosamente" });
});
exports.postMatchPlayer = postMatchPlayer;
const deletePlayer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const player = yield player_1.default.findByPk(id);
        if (!player) {
            return resp.status(404).json({
                msg: `Player with id ${id} not found`
            });
        }
        yield player.destroy();
        resp.json(player);
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
});
exports.deletePlayer = deletePlayer;
const postScore = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    var socket = req.app.get('socketio');
    console.log(body);
    const scoreData = {
        idTeam: body.team.id,
        idPlayer: body.player.id,
        idMatch: body.id
    };
    socket.emit('PlayerScore' + body.id, body);
    try {
        const score = yield scores_1.default.create(scoreData);
        return resp.json(score);
    }
    catch (error) {
        return resp.status(500).json({
            msg: 'Error',
            error: error
        });
    }
});
exports.postScore = postScore;
//# sourceMappingURL=players.js.map