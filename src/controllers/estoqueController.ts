import { Request, Response } from "express"
import { EstoqueService } from "../services/EstoqueService"

const estoqueService = new EstoqueService

export function listaEstoques(req: Request, res: Response){
    try{
        res.status(200).json(estoqueService.listaEstoques())
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}

export function listarEstoquePorId(req: Request, res: Response){
    const id:any = req.params.id 
    try{
        res.status(200).json(estoqueService.listaEstoquesId(id))
    }
    catch(error: any){
        res.status(404).json({message: error.message})
    }
}

export function cadastrarEstoque(req: Request, res: Response){
    try{
        const novoEstoque = estoqueService.cadastraEstoque(req.body)
        res.status(201).json({message:"Estoque Criado com sucesso",novoEstoque})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
export function atualizarEstoque(req: Request, res: Response){
     const EstoqueData = req.body
     const id = Number(req.params.id)
    try{
        const EstoqueAtualizado = estoqueService.atualizaEstoque(EstoqueData,id)
        res.status(200).json({message:"Estoque atualizado com sucesso",EstoqueAtualizado})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}

export function listarEstoquePorIdCarro(req: Request, res: Response){
    const id = Number(req.params.id_carro)
    try{
        const estoque = estoqueService.listaEstoquesIdCarro(id)
        res.status(200).json({quantidade:estoque})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}

export function deletaEstoque(req: Request, res:Response){
    const id = Number(req.params.id)
    try{
        const estoque = estoqueService.deletarEstoque(id)
        res.status(200).json({message:"Estoque deletado com sucesso",estoque})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}