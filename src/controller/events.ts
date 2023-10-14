import { Request,Response } from "express";


export const postEventBoard=async  (req: Request,resp:Response)=>{
    var socket=req.app.get('socketio');
    const {body}=req;
    socket.emit('EventsBoard'+body.matchId,body);
    resp.json({});
}