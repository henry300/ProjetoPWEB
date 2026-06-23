import { Request, Response } from "express"
import { CarroService } from "../services/CarroService"

export class CarroController {
    private carroService = new CarroService();

    async listaCarros(req: Request, res: Response) {
        try {
            res.status(200).json(await this.carroService.listaCarros())
        }
        catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async listarCarroPorId(req: Request, res: Response) {
        const id: any = req.params.id
        try {
            res.status(200).json(await this.carroService.listaCarrosId(id))
        }
        catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async listarCarrosDisponiveis(req: Request, res: Response) {
        try {
            res.status(200).json(await this.carroService.listaCarrosDisponiveis())
        }
        catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message })
        }
    }

    async cadastrarCarro(req: Request, res: Response) {
        try {
            const novoCarro = await this.carroService.cadastraCarro(req.body)
            res.status(201).json({ message: "Carro criado com sucesso", novoCarro })
        }
        catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message })
        }
    }
    async atualizarCarro(req: Request, res: Response) {
        const carroData = req.body
        const id = Number(req.params.id)
        try {
            const carroAtualizado = await this.carroService.atualizaCarro(carroData, id)
            res.status(200).json({ message: "Carro atualizado com sucesso", carroAtualizado })
        }
        catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message })
        }
    }
    async deleteCarro(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            const carroDeletado = await this.carroService.deletaCarro(id)
            res.status(200).json({ message: "Carro deletado com sucesso", carroDeletado })
        }
        catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message })
        }
    }

}
