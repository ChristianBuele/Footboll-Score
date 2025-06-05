import express, { Application } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import matchRoutes from '../routes/match';
import matchTeamRoutes from '../routes/matchTeam';
import teamRoutes from '../routes/teams';
import playerRoutes from '../routes/players';
import categoriesRoutes from '../routes/categories';
import eventsRoutes from '../routes/events';
import boxesRoutes from '../routes/boxes';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';

import db from '../db/database';
import { socketController } from '../sockets/socket';

class CustomServer {
    private app: Application;
    private port: string;
    private server:any;
    private io;
    private broadcaster: WebSocket | null = null;
    private listeners = new Set<WebSocket>();

    private apiPaths = {
        matches: '/api/matches',
        matchTeams: '/api/matchTeam',
        teams: '/api/teams',
        players: '/api/players',
        categories: '/api/categories',
        events: '/api/events',
        boxes: '/api/boxes',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.server = createServer(this.app);
        const wss = new WebSocketServer({ server:this.server });
        this.io = new Server(this.server, {
            cors: {
                origin: '*'
            }
        });
        this.app.set('socketio', this.io);
        this.dbConnection()
        this.middlewares();
        this.routes();
        this.sockets();
        this.startRadioServer(wss);
        
    }

    routes() {


        this.app.use(this.apiPaths.matches, matchRoutes);
        this.app.use(this.apiPaths.matchTeams, matchTeamRoutes);
        this.app.use(this.apiPaths.teams, teamRoutes);
        this.app.use(this.apiPaths.players, playerRoutes);
        this.app.use(this.apiPaths.categories, categoriesRoutes);
        this.app.use(this.apiPaths.boxes, boxesRoutes);
        this.app.use(this.apiPaths.events, eventsRoutes);
        this.app.use(express.static(path.join(__dirname, '../public')));

        // Ruta para manejar todas las demás rutas del lado del cliente
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    sockets() {
        this.io.on('connection', socketController);
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('DB Online');
        } catch (error: any) {
            throw new Error(error);
        }
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

    getSocketIo() {
        return this.io;
    }

    startRadioServer(wss: WebSocketServer) {
        wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: Buffer) => {
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
            if (client.readyState === WebSocket.OPEN) {
              client.send(payload);
            }
          });
          break;

        default:
          console.warn('⚠️ Tipo desconocido:', parsed.type);
      }
    } catch (err) {
      console.error('❌ Error al procesar mensaje:', err);
    }
  });

  ws.on('close', () => {
    this.listeners.delete(ws);
    if (ws === this.broadcaster) {
      this.broadcaster = null;
      console.log('🔌 Emisor desconectado');
    } else {
      console.log('🔌 Oyente desconectado');
    }
  });
});
    }
}

export default CustomServer;