import { Socket } from 'socket.io';

export const socketController = (socket: Socket) => {
    console.log('Cliente conectado ', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    let broadcaster:any = null;
    const listeners = new Set();

    socket.on('connection', (ws) => {
        ws.on('message', (message:any) => {
            const parsed = JSON.parse(message);
            if (parsed.type === 'broadcaster') {
                broadcaster = ws;
                console.log('Emisor conectado');
            } else if (parsed.type === 'listener') {
                listeners.add(ws);
                console.log('Oyente conectado');
            } else if (parsed.type === 'audio') {
                // Reenviar audio a todos los oyentes
                listeners.forEach((client:any) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(parsed.audio);
                    }
                });
            }
        })
    });

    socket.on('close', () => {
    listeners.delete(socket);
    if (socket === broadcaster) broadcaster = null;
  });

}