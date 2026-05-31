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
    try{
        res.status(200).json(carroService.listaCarrosDisponiveis())
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}

export function cadastrarCarro(req: Request, res: Response){
    try{
        const novoCarro = carroService.cadastraCarro(req.body)
        res.status(201).json({message:"Carro criado com sucesso",novoCarro})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
export function atualizarCarro(req: Request, res: Response){
     const carroData = req.body
     const id = Number(req.params.id)
    try{
        const carroAtualizado = carroService.atualizaCarro(carroData,id)
        res.status(200).json({message:"Carro atualizado com sucesso",carroAtualizado})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
export function deleteCarro(req: Request, res: Response){
    const id = Number(req.params.id)
    try{
        const carroDeletado = carroService.deletaCarro(id)
        res.status(200).json({message:"Carro deletado com sucesso",carroDeletado})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
