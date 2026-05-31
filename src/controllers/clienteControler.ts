import { Request, Response } from "express"
import { ClienteService } from "../services/ClienteService"

const clienteService = new ClienteService

export function listacliente(req: Request, res: Response ){
    try{
        res.status(200).json(clienteService.listaClientes())
    }
    catch(error:any){
        res.status(404).json({message: error.message})
    }
}
export function listaclientePorId(req: Request, res: Response){
    const id: any = req.params.id
    try{
        res.status(200).json(clienteService.listaClientePorId(id))
    }
    catch(error:any){
        res.status(404).json({message: error.message})
    }
}

export function Cadastracliente(req: Request, res: Response){
    try{
        const novocliente = clienteService.cadastraCliente(req.body)
        res.status(201).json({message:"cliente cadastrado com sucesso",novocliente})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
export function Atualizacliente(req: Request, res: Response){
    const clienteData = req.body
    const id = Number (req.params.id)
    try{
        const clienteAtualizado = clienteService.atualizaCliente(clienteData,id)
        res.status(200).json({message:"cliente atualizado com sucesso",clienteAtualizado})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
export function deletarcliente(req: Request, res: Response){
    const id = Number(req.params.id)
    try{
        const resultado = clienteService.deletaCliente(id)
        res.status(200).json({message:"cliente deletado com sucessso", resultado})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}
// export function listaNotasPorcliente(req: Request, res: Response){
//     const id:number = Number(req.params.id)
//     try{
//         res.status(200).json(clienteService.lista(id))
//     }
//     catch(error:any){
//         res.status(404).json({message: error.message})
//     }
// }



