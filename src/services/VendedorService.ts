import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/VendedorRepository";
import {NotaFiscalRepository} from "../repositories/NotaFiscalRepository";

export class VendedorService{
    VendedorRepository: VendedorRepository = VendedorRepository.getInstance()
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()

    listaVendedor(): Vendedor[] | number{
        if(this.VendedorRepository.ListaVendedor().length == 0){
             throw new Error ("Nenhum registro encontrado!")
        }
        return this.VendedorRepository.ListaVendedor()
    }
    listaVendedorPorId(id:any): Vendedor | undefined{
        const idNumber: number = parseInt(id,10)
        if(!this.VendedorRepository.listaVendedorPorId(idNumber)){
            throw new Error ("Nenhum registro encontrado")
        }
        return this.VendedorRepository.listaVendedorPorId(idNumber)
    }
    CadastraVendedor(vendedorData:any){
        if(!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined ){
            throw new Error ("Dados Faltantes");
        }
        if(this.VendedorRepository.existeMatricula(vendedorData.matricula)){
            throw new Error ("Matrícula já cadastrada");
        }
        if(vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30){
            throw new Error ("Comissão inválida");
        }
        const novoVendedor = new Vendedor(vendedorData.nome, vendedorData.matricula, vendedorData.comissao_percentual)
        this.VendedorRepository.CadastraVendedor(novoVendedor)
        return novoVendedor
    }
    AtualizaVendedor(vendedorData: Vendedor, id_vendedor:number){
        vendedorData.id_vendedor = id_vendedor;
        const cadastroAnterior = this.VendedorRepository.listaVendedorPorId(id_vendedor)
        if(!cadastroAnterior){
            throw new Error ("Vendedor não encontrado");
        }
        if(!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined){
            throw new Error ("Dados faltantes");
        }
        if(this.VendedorRepository.existeMatricula(vendedorData.matricula) && cadastroAnterior?.matricula != vendedorData.matricula){
            throw new Error ("Matrícula já cadastrada")
        }
        if(vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30){
            throw new Error ("Comissão inválida");
        }
        return this.VendedorRepository.atualizaVendedor(vendedorData)

    }
    deletarVendedor(id:number){
        const vendedor = this.VendedorRepository.listaVendedorPorId(id)
        if(!vendedor){
            throw new Error ("Vendedor não encontrado")
        }
        if(this.NotaFiscalRepository.existeNotaPorVendedor(id)){
            throw new Error ("Não é possível deletar um vendedor com notas fiscais associadas")
        }
        this.VendedorRepository.DeletarVendedor(id)
        return {message: "Vendedor deletado com sucesso"}
    }
    listaNotasPorVendedor(id:number){
        const vendedor = this.VendedorRepository.listaVendedorPorId(id)
        if(!vendedor){
            throw new Error("Vendedor não encontrado")
        }
        return this.NotaFiscalRepository.listaNotasPorVendedor(id)
    }

}