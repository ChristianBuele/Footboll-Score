
import { Request, Response } from "express";
import Match from "../models/match";
import MatchTeams from '../models/MatchTeams';
import Team from "../models/team";
import Category from "../models/category";

export const getTeamMatch = async (req: Request, resp: Response) => {
    const { id } = req.params;
    const match = await Match.findByPk(id,{
        include:{
            model: Category
        }
    });
    if (!match) {
        return resp.status(404).json({
            msg: `Match with id ${id} not found`
        });
    }

    const teamMatch = await MatchTeams.findOne({
        where: { idMatch: id }
    });

    const idTeamLocal=teamMatch?.get('idTeamLocal');
    const idTeamVisit=teamMatch?.get('idTeamVisit');

    const teamsData=await Team.findAll({
        where:[
            {id:[idTeamLocal,idTeamVisit]}
        ]
    })

    return resp.json({
        teams:teamsData,
        match
    });
}