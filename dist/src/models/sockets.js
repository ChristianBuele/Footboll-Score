"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class CustomSocket {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: '*',
            },
        });
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado', socket.id);
            socket.on('disconnect', () => {
                console.log('Cliente desconectado');
            });
        });
    }
}
exports.default = CustomSocket;
//# sourceMappingURL=sockets.js.map