import { Request,Response } from "express";
import Team from "../models/team";
import Player from "../models/player";
import MatchTeams from "../models/MatchTeams";
import PlayerTarget from "../models/playerTarget";
import Score from "../models/scores";

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
    const target=body.isYellow?1:2;
    const targetData={
        idPlayer:body.player.id,
        idTarget:target,
        idMatch:body.matchId
    }
    console.log('Llega dato de una tarjeta amarilla:',body)
    socket.emit('MatchTarget'+body.matchId,body);
    try {
        const playerTarget=await PlayerTarget.create(targetData);
        resp.json(playerTarget);
    } catch (error) {
        resp.status(500).json({
            msg:'Verify data',
            error:error
        })
    }
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
    socket.emit('MatchLineup'+body.matchId,{titulares,suplentes,team,show:body.show});
    resp.json({msg:"Alineacion mostrada existosamente",team});
}

export const getPlayersByMatch = async (req: Request, resp: Response) => {
    try {
      const { id } = req.params;
      const match = await MatchTeams.findByPk(id);
  
      if (!match) {
        return resp.status(404).json({ error: 'Partido no encontrado' });
      }
  
      const teamPlayers = await Team.findAll({
        include: [
          {
            model: Player,
            required: true,
            as:'items'
          }
        ],
        where: {
            id: [match.get('idTeamLocal'), match.get('idTeamVisit')]
          },
      });
  
      resp.json({ teamPlayers });
    } catch (error) {
        console.log(error)
      resp.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  export const postMatchPlayer= async (req: Request, resp: Response) =>{
    const {body}=req;
    var socket=req.app.get('socketio');
    socket.emit('MatchPlayer'+body.matchId,body.player);
    resp.json({msg:"Jugador mostrado existosamente"});
  }

  export const deletePlayer= async (req: Request, resp: Response) =>{
    const {id}=req.params;
    try{
        const player=await Player.findByPk(id);
        if (!player){
            return resp.status(404).json({
                msg:`Player with id ${id} not found`
            });
        }
        await player.destroy();
        resp.json(player);
    }catch(error){
        console.log(error);
        resp.status(500).json({
            msg:'Talk to the administrator'
        });
    }
  }


  export const postScore= async (req: Request, resp: Response) =>{
    const {body}=req;
    var socket=req.app.get('socketio');
    console.log(body);
    const scoreData={
        idTeam:body.team.id,
        idPlayer:body.player.id,
        idMatch:body.id
    };
    socket.emit('PlayerScore'+body.id,body);
    try {
        const score=await Score.create(scoreData);
        return resp.json(score);
    } catch (error) {
        return resp.status(500).json({
            msg:'Error',
            error:error
        })
    }
  }
