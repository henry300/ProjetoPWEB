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



