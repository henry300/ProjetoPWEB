import { Request, Response } from "express"
import { NotaFiscalService } from "../services/NotaFiscalService"

export class NotaFiscalController {

    private notaFiscalService = new NotaFiscalService()

    async listarNotaFiscal(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.notaFiscalService.listaNotas())
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }

    async listarNotaFiscalPorId(req: Request, res: Response) {
        const id: number = Number(req.params.id)
        try {
            return res.status(200).json(await this.notaFiscalService.listaNotaPorId(id))
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }

    async criarNotaFiscal(req: Request, res: Response) {
        const notaData = req.body
        try {
            return res.status(201).json(await this.notaFiscalService.emiteNota(notaData))
        } catch (error: any) {
            return res.status(error.status).json({ message: error.message })
        }
    }
}
