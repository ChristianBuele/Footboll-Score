"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const socketController = (socket) => {
    console.log('Cliente conectado ', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    let broadcaster = null;
    const listeners = new Set();
    socket.on('connection', (ws) => {
        ws.on('message', (message) => {
            const parsed = JSON.parse(message);
            if (parsed.type === 'broadcaster') {
                broadcaster = ws;
                console.log('Emisor conectado');
            }
            else if (parsed.type === 'listener') {
                listeners.add(ws);
                console.log('Oyente conectado');
            }
            else if (parsed.type === 'audio') {
                // Reenviar audio a todos los oyentes
                listeners.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(parsed.audio);
                    }
                });
            }
        });
    });
    socket.on('close', () => {
        listeners.delete(socket);
        if (socket === broadcaster)
            broadcaster = null;
    });
};
exports.socketController = socketController;
//# sourceMappingURL=socket.js.map