import { Request, Response } from "express"
import { EstoqueService } from "../services/EstoqueService"

export class EstoqueController {

    private estoqueService = new EstoqueService();

    async listaEstoque(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.estoqueService.listaEstoque())
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }

    async listaEstoqueId(req: Request, res: Response) {
        const id: any = req.params.id
        try {
            return res.status(200).json(await this.estoqueService.listaEstoqueId(id))
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }

    async cadastraEstoque(req: Request, res: Response) {
        try {
            const novoEstoque = await this.estoqueService.cadastraEstoque(req.body)
            return res.status(201).json({ message: "Estoque Criado com sucesso", novoEstoque })
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }

    async atualizaEstoque(req: Request, res: Response) {
        const EstoqueData = req.body
        const id = Number(req.params.id)
        try {
            const EstoqueAtualizado = await this.estoqueService.atualizaEstoque(EstoqueData, id)
            return res.status(200).json({ message: "Estoque atualizado com sucesso", EstoqueAtualizado })
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }

    async listarEstoquePorIdCarro(req: Request, res: Response) {
        const id = Number(req.params.id_carro)
        try {
            const estoque = await this.estoqueService.listaEstoquesIdCarro(id)
            return res.status(200).json({ quantidade: estoque })
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }

    async deletaEstoque(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            const estoque = await this.estoqueService.deletarEstoque(id)
            return res.status(200).json({ message: "Estoque deletado com sucesso", estoque })
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }
}