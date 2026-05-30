import { Request, Response } from "express"
import { VendedorService} from "../services/VendedorService"

const vendedorService = new VendedorService

export function listaVendedor(req: Request, res: Response ){
    try{
        res.status(200).json(vendedorService.listaVendedor())
    }
    catch(error:any){
        res.status(404).json({message: error.message})
    }
}
export function listaVendedorPorId(req: Request, res: Response){
    const id: any = req.params.id
    try{
        res.status(200).json(vendedorService.listaVendedorPorId(id))
    }
    catch(error:any){
        res.status(404).json({message: error.message})
    }
}
export function CadastraVendedor(req: Request, res: Response){
    try{
        const novoVendedor = vendedorService.CadastraVendedor(req.body)
        res.status(201).json({message:"Vendedor cadastrado com sucesso",novoVendedor})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
export function AtualizaVendedor(req: Request, res: Response){
    const vendedorData = req.body
    const id = Number (req.params.id)
    try{
        const vendedorAtualizado = vendedorService.AtualizaVendedor(vendedorData,id)
        res.status(200).json({message:"Vendedor atualizado com sucesso",vendedorAtualizado})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
export function deletarVendedor(req: Request, res: Response){
    const id = Number(req.params.id)
    try{
        const resultado = vendedorService.deletarVendedor(id)
        res.status(200).json({message:"Vendedor deletado com sucessso", resultado})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}



