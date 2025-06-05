import { Request,Response } from "express";
import BoxModel from "../models/box"; "../models/box";

export const getPeleas=async  (req: Request,resp:Response)=>{
    const categories=await BoxModel.findAll();
    resp.json({categories});
}

export const getPeleaById=async (req: Request,resp:Response)=>{
    const {id}=req.params;
    const pelea=await BoxModel.findByPk(id);
    if(!pelea){
        return resp.status(404).json({
            msg:`No existe una pelea con el id ${id}`
        });
    }
    resp.json({pelea});
}
