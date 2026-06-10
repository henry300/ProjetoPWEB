import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/VendedorRepository";
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository";
import { ErrorApp } from "../models/Error";

export class VendedorService {
    VendedorRepository: VendedorRepository = VendedorRepository.getInstance()
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()

    listaVendedor(): Vendedor[] | number {
        return this.VendedorRepository.ListaVendedor()
    }

    listaVendedorPorId(id: any): Vendedor | undefined {
        const idNumber: number = parseInt(id, 10)
        if (!this.VendedorRepository.listaVendedorPorId(idNumber)) {
            throw new ErrorApp(404,"Nenhum registro encontrado")
        }
        return this.VendedorRepository.listaVendedorPorId(idNumber)
    }

    CadastraVendedor(vendedorData: any) {
        if (!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined) {
            throw new ErrorApp(400,"Dados Faltantes");
        }
        if (this.VendedorRepository.existeMatricula(vendedorData.matricula)) {
            throw new ErrorApp(409,"Matrícula já cadastrada");
        }
        if (vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30) {
            throw new ErrorApp(422,"Comissão inválida");
        }
        const novoVendedor = new Vendedor(vendedorData.nome, vendedorData.matricula, vendedorData.comissao_percentual)
        this.VendedorRepository.CadastraVendedor(novoVendedor)
        return novoVendedor
    }

    AtualizaVendedor(vendedorData: Vendedor, id_vendedor: number) {
        vendedorData.id_vendedor = id_vendedor;
        const cadastroAnterior = this.VendedorRepository.listaVendedorPorId(id_vendedor)
        if (!cadastroAnterior) {
            throw new ErrorApp(404,"Vendedor não encontrado");
        }
        if (!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined) {
            throw new ErrorApp(400,"Dados faltantes");
        }
        if (this.VendedorRepository.existeMatricula(vendedorData.matricula) && cadastroAnterior?.matricula != vendedorData.matricula) {
            throw new ErrorApp(409,"Matrícula já cadastrada")
        }
        if (vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30) {
            throw new ErrorApp(422,"Comissão inválida");
        }
        return this.VendedorRepository.atualizaVendedor(vendedorData)

    }

    deletarVendedor(id: number) {
        const vendedor = this.VendedorRepository.listaVendedorPorId(id)
        if (!vendedor) {
            throw new ErrorApp(404,"Vendedor não encontrado")
        }
        if (this.NotaFiscalRepository.existeNotaPorVendedor(id)) {
            throw new ErrorApp(422,"Não é possível deletar um vendedor com notas fiscais associadas")
        }
        this.VendedorRepository.DeletarVendedor(id)
        return { message: "Vendedor deletado com sucesso" }
    }
    
    listaNotasPorVendedor(id: number) {
        if (!this.VendedorRepository.listaVendedorPorId(id)) {
            throw new ErrorApp(404,"Vendedor não encontrado")
        }
        if (this.NotaFiscalRepository.listaNotasPorVendedor(id).length === 0) {
            throw new ErrorApp(404,"Não existe notas para esse cliente")
        }
        return this.NotaFiscalRepository.listaNotasPorVendedor(id)
    }
}