import dotenv from 'dotenv';
import CustomServer from './src/models/server';

//env
dotenv.config();

const server=new CustomServer();

server.listen();