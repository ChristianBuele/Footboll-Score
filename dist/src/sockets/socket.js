"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const socketController = (socket) => {
    console.log('Cliente conectado ', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
exports.socketController = socketController;
//# sourceMappingURL=socket.js.map