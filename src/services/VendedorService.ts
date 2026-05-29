import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/VendedorRepository";

export class VendedorService{
    Repository: VendedorRepository = VendedorRepository.getInstance()

    listaVendedor(): Vendedor[] | number{
        if(this.Repository.ListaVendedor().length == 0){
             throw new Error ("Nenhum registro encontrado!")
        }
        return this.Repository.ListaVendedor()
    }
    listaVendedorPorId(id:any): Vendedor | undefined{
        const idNumber: number = parseInt(id,10)
        if(!this.Repository.listaVendedorPorId(idNumber)){
            throw new Error ("Nenhum registro encontrado")
        }
        return this.Repository.listaVendedorPorId(idNumber)
    }
    CadastraVendedor(vendedorData:any){
        if(!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined ){
            throw new Error ("Dados Faltantes");
        }
        if(this.Repository.existeMatricula(vendedorData.matricula)){
            throw new Error ("Matrícula já cadastrada");
        }
        if(vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30){
            throw new Error ("Comissão inválida");
        }
        const novoVendedor = new Vendedor(vendedorData.nome, vendedorData.matricula, vendedorData.comissao_percentual)
        this.Repository.CadastraVendedor(novoVendedor)
        return novoVendedor
    }
    AtualizaVendedor(vendedorData: Vendedor, id_vendedor:number){
        vendedorData.id_vendedor = id_vendedor;
        const cadastroAnterior = this.Repository.listaVendedorPorId(id_vendedor)
        if(!cadastroAnterior){
            throw new Error ("Vendedor não encontrado");
        }
        if(!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined){
            throw new Error ("Dados faltantes");
        }
        if(this.Repository.existeMatricula(vendedorData.matricula) && cadastroAnterior?.matricula != vendedorData.matricula){
            throw new Error ("Matrícula já cadastrada")
        }
        if(vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30){
            throw new Error ("Comissão inválida");
        }
        return this.Repository.atualizaVendedor(vendedorData)

    }

}