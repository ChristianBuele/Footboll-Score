import { Request,Response } from "express";
import MatchTeams from "../models/MatchTeams";
import Team from "../models/team";

export const getTeamMatches=async (req: Request,resp:Response) => {
    const teamMatches=await MatchTeams.findAll();
    let data:any[]=[];
    for (const teamMatch of teamMatches){
        const local=await Team.findByPk(teamMatch.dataValues['idTeamLocal']);
        const visit=await Team.findByPk(teamMatch.dataValues['idTeamVisit']);

        data.push({teamMatch,local,visit});
    }
  
    resp.json(data);
}