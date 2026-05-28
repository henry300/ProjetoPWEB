import { error } from "node:console";
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
}