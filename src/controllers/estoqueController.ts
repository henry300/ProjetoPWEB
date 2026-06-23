import { Request, Response } from "express"
import { EstoqueService } from "../services/EstoqueService"

export class EstoqueController {

    private estoqueService = new EstoqueService();

    async listaEstoque(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.estoqueService.listaEstoques())
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async listaEstoqueId(req: Request, res: Response) {
        const id: any = req.params.id
        try {
            return res.status(200).json(await this.estoqueService.listaEstoquesId(id))
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async cadastraEstoque(req: Request, res: Response) {
        try {
            return res.status(201).json(await this.estoqueService.cadastraEstoque(req.body))
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async atualizaEstoque(req: Request, res: Response) {
        const EstoqueData = req.body
        const id = Number(req.params.id)
        try {
            return res.status(200).json(await this.estoqueService.atualizaEstoque(EstoqueData, id))
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async listarEstoquePorIdCarro(req: Request, res: Response) {
        const id = Number(req.params.id_carro)
        try {
            const estoque = await this.estoqueService.listaEstoquesIdCarro(id)
            return res.status(200).json({ quantidade: estoque })
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async deletaEstoque(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            const estoque = await this.estoqueService.deletarEstoque(id)
            return res.status(200).json({ message: "Estoque deletado com sucesso", estoque })
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ message: error.message })
        }
    }
}