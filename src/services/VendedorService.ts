import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/VendedorRepository";
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository";
import { ErrorApp } from "../models/Error";

export class VendedorService {
    VendedorRepository: VendedorRepository = VendedorRepository.getInstance()
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()

    async listaVendedor(): Promise<Vendedor[] | number> {
        return await this.VendedorRepository.ListaVendedor()
    }

    async listaVendedorPorId(id: any): Promise<Vendedor | null> {
        const idNumber: number = parseInt(id, 10)
        if (!await this.VendedorRepository.listaVendedorPorId(idNumber)) {
            throw new ErrorApp(404,"Nenhum registro encontrado")
        }
        return await this.VendedorRepository.listaVendedorPorId(idNumber)
    }

    async CadastraVendedor(vendedorData: any) {
        if (!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined) {
            throw new ErrorApp(400,"Dados Faltantes");
        }
        if (await this.VendedorRepository.existeMatricula(vendedorData.matricula)) {
            throw new ErrorApp(409,"Matrícula já cadastrada");
        }
        if (vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30) {
            throw new ErrorApp(400,"Comissão inválida");
        }

        const novoVendedor = new Vendedor(vendedorData.id_vendedor, vendedorData.nome, vendedorData.matricula, vendedorData.comissao_percentual)
        
        return await this.VendedorRepository.CadastraVendedor(novoVendedor)
    }

    async AtualizaVendedor(vendedorData: Vendedor, id_vendedor: number) {
        vendedorData.id_vendedor = id_vendedor;
        const cadastroAnterior = await this.VendedorRepository.listaVendedorPorId(id_vendedor)
        if (!cadastroAnterior) {
            throw new ErrorApp(404,"Vendedor não encontrado");
        }
        if (!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined) {
            throw new ErrorApp(400,"Dados faltantes");
        }
        if (await this.VendedorRepository.existeMatricula(vendedorData.matricula) && cadastroAnterior?.matricula != vendedorData.matricula) {
            throw new ErrorApp(409,"Matrícula já cadastrada")
        }
        if (vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30) {
            throw new ErrorApp(422,"Comissão inválida");
        }
        return await this.VendedorRepository.atualizaVendedor(vendedorData)
    }

    async deletarVendedor(id: number) {
        const vendedor = this.VendedorRepository.listaVendedorPorId(id)
        if (!vendedor) {
            throw new ErrorApp(404,"Vendedor não encontrado")
        }
        if (await this.NotaFiscalRepository.existeNotaPorVendedor(id)) {
            throw new ErrorApp(422,"Não é possível deletar um vendedor com notas fiscais associadas")
        }
        this.VendedorRepository.DeletarVendedor(id)
        return { message: "Vendedor deletado com sucesso" }
    }
    
    async listaNotasPorVendedor(id: number) {
        if (!await this.VendedorRepository.listaVendedorPorId(id)) {
            throw new ErrorApp(404,"Vendedor não encontrado")
        }
        if (!await this.NotaFiscalRepository.listaNotasPorVendedor(id)) {
            throw new ErrorApp(404,"Não existe notas para esse cliente")
        }
        return await this.NotaFiscalRepository.listaNotasPorVendedor(id)
    }
}