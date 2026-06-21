import { Request, Response } from "express"
import { ClienteService } from "../services/ClienteService"

export class clienteControler {

    private clienteService = new ClienteService();
    
    async listacliente(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.clienteService.listaClientes())
        }
        catch (error: any) {
            return res.status(error.status?? 500).json({ message: error.message })
        }
    }

    async listaclientePorId(req: Request, res: Response) {
        const id: any = req.params.id
        try {
            return res.status(200).json(await this.clienteService.listaClientePorId(id))
        }
        catch (error: any) {
            return res.status(error.status?? 500).json({ message: error.message })
        }
    }

    async Cadastracliente(req: Request, res: Response) {
        try {
            const novocliente = await this.clienteService.cadastraCliente(req.body)
            return res.status(201).json({ message: "cliente cadastrado com sucesso", novocliente })
        }
        catch (error: any) {
            return res.status(error.status?? 500).json({ message: error.message })
        }
    }

    async Atualizacliente(req: Request, res: Response) {
        const clienteData = req.body
        const id = Number(req.params.id)
        try {
            const clienteAtualizado = await this.clienteService.atualizaCliente(clienteData, id)
            return res.status(200).json({ message: "cliente atualizado com sucesso", clienteAtualizado })
        }
        catch (error: any) {
            return res.status(error.status?? 500).json({ message: error.message })
        }
    }

    async deletarcliente(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            const resultado = await this.clienteService.deletaCliente(id)
            return res.status(200).json({ message: "cliente deletado com sucessso", resultado })
        }
        catch (error: any) {
            return res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async listaNotasPorCliente(req: Request, res: Response) {
        const id: number = Number(req.params.id)
        try {
            return res.status(200).json(await this.clienteService.listaNotasPorCliente(id))
        }
        catch (error: any) {
            return res.status(error.status?? 500).json({ message: error.message })
        }
    }

}


