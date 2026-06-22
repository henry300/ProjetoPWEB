import { Request, Response } from "express"
import { VendedorService } from "../services/VendedorService";

export class VendedorController{
    private vendedorService = new VendedorService();

    async listaVendedor(req: Request, res: Response) {
    try {
        res.status(200).json(await this.vendedorService.listaVendedor())
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

    async listaVendedorPorId(req: Request, res: Response) {
    const id: any = req.params.id
    try {
        res.status(200).json(await this.vendedorService.listaVendedorPorId(id))
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

     async CadastraVendedor(req: Request, res: Response) {
    try {
        const novoVendedor = await this.vendedorService.CadastraVendedor(req.body)
        res.status(201).json({ message: "Vendedor cadastrado com sucesso", novoVendedor })
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

    async AtualizaVendedor(req: Request, res: Response) {
    const vendedorData = req.body
    const id = Number(req.params.id)
    try {
        const vendedorAtualizado = await this.vendedorService.AtualizaVendedor(vendedorData, id)
        res.status(200).json({ message: "Vendedor atualizado com sucesso", vendedorAtualizado })
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

    async deletarVendedor(req: Request, res: Response) {
    const id = Number(req.params.id)
    try {
        const resultado = await this.vendedorService.deletarVendedor(id)
        res.status(200).json({ message: "Vendedor deletado com sucessso", resultado })
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

    async listaNotasPorVendedor(req: Request, res: Response) {
    const id = Number(req.params.id)
    try {
        res.status(200).json(await this.vendedorService.listaNotasPorVendedor(id))
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}
} 
