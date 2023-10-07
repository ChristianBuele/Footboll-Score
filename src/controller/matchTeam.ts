import { Request,Response } from "express";
import MatchTeams from "../models/MatchTeams";
import Team from "../models/team";
import Match from "../models/match";
import Category from "../models/category";

export const getTeamMatches=async (req: Request,resp:Response) => {
    const teamMatches=await MatchTeams.findAll({
        order:[
            ['id','DESC']
        ]
    });
    let data:any[]=[];
    for (const teamMatch of teamMatches){
        const local=await Team.findByPk(teamMatch.dataValues['idTeamLocal']);
        const visit=await Team.findByPk(teamMatch.dataValues['idTeamVisit']);
        const match=await Match.findByPk(teamMatch.dataValues['idMatch']);
        const category=await Category.findByPk(match?.dataValues['idCategory']);
        data.push({teamMatch,local,visit,category});
    }
  
    resp.json(data);
}

export const postTeamMatch=async (req: Request,resp:Response) => {
    const {date,location,minutes,categorie,teamLocal,teamVisit}=req.body;
    const match = await Match.create({
        date,
        location,
        minutes,
        startTime:new Date(),
        idCategory:categorie.id,
        active:true
    });
    const teamMatch=await MatchTeams.create({
        idTeamLocal:teamLocal.id,
        idTeamVisit:teamVisit.id,
        idMatch:match.get('id')
    });
    
    resp.json({teamMatch,match});
}