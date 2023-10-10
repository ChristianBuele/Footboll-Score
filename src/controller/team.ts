import { Request,Response } from "express";
import Team from "../models/team";

export const getTeams =async (req: Request,resp:Response)=>{
    const teams=await Team.findAll(
        {
            order:[['id','DESC']]
        }
    );
    resp.json({teams});
}

export const postTeam =async (req: Request,resp:Response)=>{
    const {body}=req;
    try{
        const team = await Team.create(body);
        resp.json(team);
    }catch(error){
        console.log(error)
        resp.status(500).json({
            msg:'Verify data',
            error
        });
    }
}
export const putTeam = async (req:Request,resp: Response) => {
    const {id} = req.params;
    const {body}=req;
    try{
        const team = await Team.findByPk(id);
        if (!team){
            return resp.status(404).json({
                msg:`Team with id ${id} not found`
            });
        }
        await team.update(body);
        resp.json(team);
    }catch(error){
        resp.status(500).json({
            msg:'Verify data'
        });
    }
}