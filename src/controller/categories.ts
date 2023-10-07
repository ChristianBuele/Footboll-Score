import { Request,Response } from "express";
import Category from "../models/category";

export const getCategories=async  (req: Request,resp:Response)=>{
    const categories=await Category.findAll();
    resp.json({categories});
}

export const postCategorie=async (req: Request,resp:Response)=>{
    const {name}=req.body;
    const categorie=await Category.create({
        name
    });
    resp.json(categorie);
}