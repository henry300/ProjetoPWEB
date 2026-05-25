import { Request, Response } from "express"
import { CarroService } from "../services/CarroService"
const carroService = new CarroService

export function listaCarros(req: Request, res: Response){
    try{
        res.status(200).json(carroService.listaCarros())
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}

export function listarCarroPorId(req: Request, res: Response){
    const id:any = req.params.id 
    try{
        res.status(200).json(carroService.listaCarrosId(id))
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}

export function listarCarrosDisponiveis(req: Request, res: Response){
    
}

export function cadastrarCarro(req: Request, res: Response){

}
export function atualizarCarro(req: Request, res: Response){

}
export function deleteCarro(req: Request, res: Response){

}
