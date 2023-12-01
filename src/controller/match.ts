import { Request,Response } from "express";
import Match from "../models/match";
import Category from "../models/category";

export const getMatchs =async (req: Request,resp:Response)=>{
    const matches=await Match.findAll(
        {
            order:[
                ['id','ASC']
            ],
            include:{
                model:Category
            }
        }
    );


    resp.json({matches});
}

export const getMatch= async(req: Request,resp:Response)=>{
    const {id}=req.params;
    const match=await Match.findByPk(id);
    if (match){
        return resp.json({
            match
        });
    }
    console.log('asdas')
    return resp.status(404).json({
        msg:`Match with id ${id} not found`
    });
    
}

export const postMatch=(req: Request,resp:Response)=>{
    const {body}=req;
    try {
        const match = Match.create(body);
        resp.json(match);
    } catch (error) {
        resp.status(500).json({
            msg:'Verify data'
        });
    }
}

export const putMatch=(req: Request,resp:Response)=>{
    const {id} = req.params;
    const {body}=req;
    
    resp.json({
        msg:"put match",
        body
    })
}

export const postMatchScore=(req: Request,resp:Response)=>{
    const {body}=req;
    console.log(body);
    var socket=req.app.get('socketio');
    socket.emit('MatchScoreTest'+body.id,body);
    resp.json({
        msg:"post match score test",
        body
    })
}

export const postTimeEvents=(req: Request,resp:Response)=>{
    const {body}=req;
    console.log(body);
    var socket=req.app.get('socketio');
    socket.emit('TimeEvents'+body.id,body);
    resp.json({
        msg:"post time event successfully",
        body
    })
}
export const postPlayOrPauseTime=(req: Request,resp:Response)=>{
    const {body}=req;
    console.log(body);
    var socket=req.app.get('socketio');
    socket.emit('PlayOrPauseTime'+body.id,body);
    resp.json({
        msg:"post match score",
        body
    });
}
export const postMatchTime=(req: Request,resp:Response)=>{
    const {body}=req;
    console.log(body);
    var socket=req.app.get('socketio');
    socket.emit('MatchTime'+body.id,body);
    resp.json({
        msg:"post match score",
        body
    })
}

export const postPenal=(req: Request,resp:Response)=>{
    const {body}=req;
    console.log(body);
    var socket=req.app.get('socketio');
    socket.emit('Penal'+body.id,body);
    resp.json({
        msg:"penal existoso",
        body
    })
}

export const postShowBoard=(req: Request,resp:Response)=>{
    const {body}=req;
    console.log(body);
    var socket=req.app.get('socketio');
    socket.emit('ShowBoard'+body.id,body);
    resp.json({
        msg:"showBoard score",
        body
    })
}

export const postStatistics=(req: Request,resp:Response)=>{
    const {body}=req;
    console.log(body);
    var socket=req.app.get('socketio');
    socket.emit('Statistics'+body.id,body);
    resp.json({
        msg:"Data de estadisticas mostrada correctamente",
        body
    })
}