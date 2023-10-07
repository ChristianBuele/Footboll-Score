import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"

export const validateFields =(req:Request,resp:Response, next:NextFunction)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return resp.status(400).json(errors);
    }
    next();
}