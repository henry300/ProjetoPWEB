import { Request, Response } from "express"
import { CarroService } from "../services/CarroService"

const carroService = new CarroService

export async function listaCarros(req: Request, res: Response) {
    try {
        res.status(200).json(await carroService.listaCarros())
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

export async function listarCarroPorId(req: Request, res: Response) {
    const id: any = req.params.id
    try {
        res.status(200).json(await carroService.listaCarrosId(id))
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

export async function listarCarrosDisponiveis(req: Request, res: Response) {
    try {
        res.status(200).json(await carroService.listaCarrosDisponiveis())
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}

export async function cadastrarCarro(req: Request, res: Response) {
    try {
        const novoCarro = await carroService.cadastraCarro(req.body)
        res.status(201).json({ message: "Carro criado com sucesso", novoCarro })
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}
export async function atualizarCarro(req: Request, res: Response) {
    const carroData = req.body
    const id = Number(req.params.id)
    try {
        const carroAtualizado = await carroService.atualizaCarro(carroData, id)
        res.status(200).json({ message: "Carro atualizado com sucesso", carroAtualizado })
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}
export async function deleteCarro(req: Request, res: Response) {
    const id = Number(req.params.id)
    try {
        const carroDeletado = await carroService.deletaCarro(id)
        res.status(200).json({ message: "Carro deletado com sucesso", carroDeletado })
    }
    catch (error: any) {
        res.status(error.status ?? 500).json({ message: error.message })
    }
}
