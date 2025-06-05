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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const match_1 = __importDefault(require("../routes/match"));
const matchTeam_1 = __importDefault(require("../routes/matchTeam"));
const teams_1 = __importDefault(require("../routes/teams"));
const players_1 = __importDefault(require("../routes/players"));
const categories_1 = __importDefault(require("../routes/categories"));
const events_1 = __importDefault(require("../routes/events"));
const boxes_1 = __importDefault(require("../routes/boxes"));
const path_1 = __importDefault(require("path"));
const ws_1 = require("ws");
const database_1 = __importDefault(require("../db/database"));
const socket_1 = require("../sockets/socket");
class CustomServer {
    constructor() {
        this.broadcaster = null;
        this.listeners = new Set();
        this.apiPaths = {
            matches: '/api/matches',
            matchTeams: '/api/matchTeam',
            teams: '/api/teams',
            players: '/api/players',
            categories: '/api/categories',
            events: '/api/events',
            boxes: '/api/boxes',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.server = (0, http_1.createServer)(this.app);
        const wss = new ws_1.WebSocketServer({ server: this.server });
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: '*'
            }
        });
        this.app.set('socketio', this.io);
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.sockets();
        this.startRadioServer(wss);
    }
    routes() {
        this.app.use(this.apiPaths.matches, match_1.default);
        this.app.use(this.apiPaths.matchTeams, matchTeam_1.default);
        this.app.use(this.apiPaths.teams, teams_1.default);
        this.app.use(this.apiPaths.players, players_1.default);
        this.app.use(this.apiPaths.categories, categories_1.default);
        this.app.use(this.apiPaths.boxes, boxes_1.default);
        this.app.use(this.apiPaths.events, events_1.default);
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
        // Ruta para manejar todas las demás rutas del lado del cliente
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    sockets() {
        this.io.on('connection', socket_1.socketController);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.authenticate();
                console.log('DB Online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
    getSocketIo() {
        return this.io;
    }
    startRadioServer(wss) {
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                try {
                    const parsed = JSON.parse(message.toString());
                    switch (parsed.type) {
                        case 'broadcaster':
                            this.broadcaster = ws;
                            console.log('🎙️ Emisor conectado');
                            break;
                        case 'listener':
                            this.listeners.add(ws);
                            console.log('👂 Oyente conectado');
                            break;
                        case 'audio':
                            // reenviar audio a todos los oyentes
                            const payload = JSON.stringify({ type: 'audio', audio: parsed.audio });
                            this.listeners.forEach((client) => {
                                if (client.readyState === ws_1.WebSocket.OPEN) {
                                    client.send(payload);
                                }
                            });
                            break;
                        default:
                            console.warn('⚠️ Tipo desconocido:', parsed.type);
                    }
                }
                catch (err) {
                    console.error('❌ Error al procesar mensaje:', err);
                }
            });
            ws.on('close', () => {
                this.listeners.delete(ws);
                if (ws === this.broadcaster) {
                    this.broadcaster = null;
                    console.log('🔌 Emisor desconectado');
                }
                else {
                    console.log('🔌 Oyente desconectado');
                }
            });
        });
    }
}
exports.default = CustomServer;
//# sourceMappingURL=server.js.map