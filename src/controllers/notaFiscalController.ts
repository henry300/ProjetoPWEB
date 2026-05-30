import { Request, Response } from "express"
import { NotaFiscalService } from "../services/NotaFiscalService"

const notaFiscalService = new NotaFiscalService

export function listarNotaFiscal(req: Request, res: Response){
    try{
        res.status(200).json(notaFiscalService.listaNotas())
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}

export function listarNotaFiscalPorId(req: Request, res: Response){
    const id:number = Number(req.params.id)
    try{
        res.status(200).json(notaFiscalService.listaNotaPorId(id))
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}

export function criarNotaFiscal(req: Request, res: Response){
    const notaData = req.body
    try{
        res.status(200).json(notaFiscalService.emiteNota(notaData))
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}
