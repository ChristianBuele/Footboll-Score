import { Request,Response } from "express";
import Team from "../models/team";
import Player from "../models/player";

export const getPlayersByTeamId =async (req: Request,resp:Response)=>{
    const {id}=req.params;
    const team=await Team.findByPk(id);
    if (!team){
        return resp.status(404).json({
            msg:`Team with id ${id} not found`
        });
    }

    const players=await Player.findAll(
        {
            where:{
                idTeam:id
            }
        }
    );
    resp.json({players});
}

export const postPlayer=async (req: Request,resp:Response)=>{
    const {body}=req;
    try{
        const player=await Player.create(body);
        resp.json(player);
    }catch(error){
        console.log(error);
        resp.status(500).json({
            msg:'Talk to the administrator'
        });
    }
}

export const putPlayer =async (req: Request,resp:Response)=>{
    const {id}=req.params;
    const {body}=req;
    try{
        const player=await Player.findByPk(id);
        if (!player){
            return resp.status(404).json({
                msg:`Player with id ${id} not found`
            });
        }
        await player.update(body);
        resp.json(player);
    }catch(error){
        console.log(error);
        resp.status(500).json({
            msg:'Talk to the administrator'
        });
    }
}

export const postTarget=async(req: Request,resp:Response)=>{
    const {body}=req;
    var socket=req.app.get('socketio');
    console.log(body)
    socket.emit('MatchTarget'+body.matchId,body);
    resp.json({msg:"Tarjeta mostrada correctamente"});
}

export const postChange =async (req: Request,resp:Response)=>{
    const {body}=req;
    var socket=req.app.get('socketio');
    console.log(body)
    socket.emit('MatchChange'+body.matchId,body);
    resp.json({msg:"Cambio existoso correctamente"});
}

export const postLineupByTeam=async (req: Request,resp:Response)=>{
    const {body}=req;
    var socket=req.app.get('socketio');
    const titulares=await Player.findAll(
        {
            where:[
                {idTeam:body.idTeam},
                {present:true},
                {titular:true}
            ]
        }
    );
    const suplentes=await Player.findAll(
        {
            where:[
                {idTeam:body.idTeam},
                {present:true},
                {titular:false}
            ]
        }
    );
    const team=await Team.findByPk(body.idTeam);
    socket.emit('MatchLineup'+body.matchId,{titulares,suplentes,team});
    resp.json({msg:"Alineacion mostrada existosamente",team});
}
