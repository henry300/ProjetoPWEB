import { Cliente } from "../models/Cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"

export class ClienteService{
    NotFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    ClienteRepository:ClienteRepository = ClienteRepository.getInstance();

    listaClientes(): Cliente[] | number {
        if(this.ClienteRepository.listaClientes().length == 0){
            throw new Error ("Nenhum registro encontrado!")
       }
       return this.ClienteRepository.listaClientes()
   }

   listaClientePorId(id: any): Cliente | undefined{
    const idNumber: number = parseInt(id, 10);
        if(!this.ClienteRepository.listaClientePorId(idNumber)){
             throw new Error("Nenhum registro encontrado");
        }
        return this.ClienteRepository.listaClientePorId(idNumber)
   }

   cadastraCliente(clienteData: any){
        if(!clienteData.cpf || !clienteData.nome || !clienteData.telefone){
            throw new Error("Dados faltantes");
        } 
        if (this.ClienteRepository.existeCpf(clienteData.cpf)) {
            throw new Error("cpf já cadastrado");
        }
        const novoCliente = new Cliente(clienteData.nome, clienteData.telefone, clienteData.cpf, clienteData.email, clienteData.cidade)
        this.ClienteRepository.adicionaCliente(novoCliente)
        return novoCliente
   }

   atualizaCliente(clienteData: any, id_cliente: any){
    clienteData.id_cliente = id_cliente;
    const cadastroAntigo = this.ClienteRepository.listaClientePorId(id_cliente)
        
    if(!cadastroAntigo){
        throw new Error("Cliente não encontrado");
    }
    if(!clienteData.nome || !clienteData.telefone || !clienteData.cpf){
        throw new Error("Dados faltantes");
    }
    
    if(this.ClienteRepository.existeCpf(clienteData.cpf) && cadastroAntigo.cpf != clienteData.cpf) {
        throw new Error("cpf já cadastrado");
    }
        return this.ClienteRepository.atualizaCliente(clienteData)
    }

    deletaCliente(id: any){
        if(!this.ClienteRepository.listaClientePorId(id)){
            throw new Error("Cliente não encontrado");
       }
       if(this.NotFiscalRepository.existeNotaPorCliente(id)){
            throw new Error("Cliente possuí notas emitidas em seu nome")
       }
       this.ClienteRepository.deletaCliente(id) 
    }
   }


