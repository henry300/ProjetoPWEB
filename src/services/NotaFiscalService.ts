import { NotaFiscal } from "../models/NotaFiscal"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"
import { ClienteRepository } from "../repositories/clienteRepository"
import { VendedorRepository } from "../repositories/VendedorRepository"
import { CarroRepository } from "../repositories/CarroRepository"
import { EstoqueRepository } from "../repositories/EstoqueRepository"


export class NotaFiscalService{
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    ClienteRepository: ClienteRepository = ClienteRepository.getInstance()
    VendedorRepository: VendedorRepository = VendedorRepository.getInstance()
    CarroRepository: CarroRepository = CarroRepository.getInstance()
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
   
    listaNotas(): NotaFiscal[] | number{
        if(this.NotaFiscalRepository.listaNotas().length == 0){
            throw new Error("Nenhum registro encontrado")
        }
        return this.NotaFiscalRepository.listaNotas()  
    }


    listaNotaPorId(id: any){
        const idNumber: number = parseInt(id, 10);
        if(!this.NotaFiscalRepository.listaNotaPorId(idNumber)){
             throw new Error("Nenhum registro encontrado");
        }
        return this.NotaFiscalRepository.listaNotaPorId(idNumber)
    }
    emiteNota(notaData: any){
        
    }
}

