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
    cadastraVendedor(vendedorData:any){
        const dataAtual = new Date()
        const anoAtual = dataAtual.getFullYear();
        if(!vendedorData.nome || !vendedorData.matricula || vendedorData.comissao_percentual == undefined ){
            throw new Error ("Dados Faltantes");
        }
        if(this.Repository.existeMatricula(vendedorData.matricula)){
            throw new Error ("Matricula já cadastrada");
        }
        if(vendedorData.comissao_percentual < 0 || vendedorData.comissao_percentual > 30){
            throw new Error ("Comissão inválida");
        }

    }

}