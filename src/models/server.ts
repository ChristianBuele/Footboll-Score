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

import db from '../db/database';
import { socketController } from '../sockets/socket';

class CustomServer {
    private app: Application;
    private port: string;
    private server;
    private io;

    private apiPaths = {
        matches: '/api/matches',
        matchTeams: '/api/matchTeam',
        teams: '/api/teams',
        players: '/api/players',
        categories: '/api/categories',
        events:'/api/events',
        boxes:'/api/boxes',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.server = createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: '*'
            }
        });
        this.app.set('socketio',this.io);
        this.dbConnection()
        this.middlewares();
        this.routes();
        this.sockets();
    }

    routes() {
    

        this.app.use(this.apiPaths.matches, matchRoutes);
        this.app.use(this.apiPaths.matchTeams, matchTeamRoutes);
        this.app.use(this.apiPaths.teams, teamRoutes);
        this.app.use(this.apiPaths.players, playerRoutes);
        this.app.use(this.apiPaths.categories, categoriesRoutes);
        this.app.use(this.apiPaths.boxes,boxesRoutes);
        this.app.use(this.apiPaths.events,eventsRoutes);
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
}

export default CustomServer;