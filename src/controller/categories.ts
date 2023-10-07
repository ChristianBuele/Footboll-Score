import { Request,Response } from "express";
import Category from "../models/category";

export const getCategories=async  (req: Request,resp:Response)=>{
    const categories=await Category.findAll();
    resp.json({categories});
}