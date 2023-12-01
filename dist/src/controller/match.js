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
exports.postStatistics = exports.postShowBoard = exports.postPenal = exports.postMatchTime = exports.postPlayOrPauseTime = exports.postTimeEvents = exports.postMatchScore = exports.putMatch = exports.postMatch = exports.getMatch = exports.getMatchs = void 0;
const match_1 = __importDefault(require("../models/match"));
const category_1 = __importDefault(require("../models/category"));
const getMatchs = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = yield match_1.default.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: {
            model: category_1.default
        }
    });
    resp.json({ matches });
});
exports.getMatchs = getMatchs;
const getMatch = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const match = yield match_1.default.findByPk(id);
    if (match) {
        return resp.json({
            match
        });
    }
    console.log('asdas');
    return resp.status(404).json({
        msg: `Match with id ${id} not found`
    });
});
exports.getMatch = getMatch;
const postMatch = (req, resp) => {
    const { body } = req;
    try {
        const match = match_1.default.create(body);
        resp.json(match);
    }
    catch (error) {
        resp.status(500).json({
            msg: 'Verify data'
        });
    }
};
exports.postMatch = postMatch;
const putMatch = (req, resp) => {
    const { id } = req.params;
    const { body } = req;
    resp.json({
        msg: "put match",
        body
    });
};
exports.putMatch = putMatch;
const postMatchScore = (req, resp) => {
    const { body } = req;
    console.log(body);
    var socket = req.app.get('socketio');
    socket.emit('MatchScoreTest' + body.id, body);
    resp.json({
        msg: "post match score test",
        body
    });
};
exports.postMatchScore = postMatchScore;
const postTimeEvents = (req, resp) => {
    const { body } = req;
    console.log(body);
    var socket = req.app.get('socketio');
    socket.emit('TimeEvents' + body.id, body);
    resp.json({
        msg: "post time event successfully",
        body
    });
};
exports.postTimeEvents = postTimeEvents;
const postPlayOrPauseTime = (req, resp) => {
    const { body } = req;
    console.log(body);
    var socket = req.app.get('socketio');
    socket.emit('PlayOrPauseTime' + body.id, body);
    resp.json({
        msg: "post match score",
        body
    });
};
exports.postPlayOrPauseTime = postPlayOrPauseTime;
const postMatchTime = (req, resp) => {
    const { body } = req;
    console.log(body);
    var socket = req.app.get('socketio');
    socket.emit('MatchTime' + body.id, body);
    resp.json({
        msg: "post match score",
        body
    });
};
exports.postMatchTime = postMatchTime;
const postPenal = (req, resp) => {
    const { body } = req;
    console.log(body);
    var socket = req.app.get('socketio');
    socket.emit('Penal' + body.id, body);
    resp.json({
        msg: "penal existoso",
        body
    });
};
exports.postPenal = postPenal;
const postShowBoard = (req, resp) => {
    const { body } = req;
    console.log(body);
    var socket = req.app.get('socketio');
    socket.emit('ShowBoard' + body.id, body);
    resp.json({
        msg: "showBoard score",
        body
    });
};
exports.postShowBoard = postShowBoard;
const postStatistics = (req, resp) => {
    const { body } = req;
    console.log(body);
    var socket = req.app.get('socketio');
    socket.emit('Statistics' + body.id, body);
    resp.json({
        msg: "Data de estadisticas mostrada correctamente",
        body
    });
};
exports.postStatistics = postStatistics;
//# sourceMappingURL=match.js.map