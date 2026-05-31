import { Cliente } from "../models/Cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"
import { ErrorApp } from "../models/Error";

export class ClienteService {
    NotFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    ClienteRepository: ClienteRepository = ClienteRepository.getInstance();

    listaClientes(): Cliente[] | number {
        if (this.ClienteRepository.listaClientes().length == 0) {
            throw new ErrorApp(404,"Nenhum registro encontrado!")
        }
        return this.ClienteRepository.listaClientes()
    }

    listaClientePorId(id: any): Cliente | undefined {
        const idNumber: number = parseInt(id, 10);
        if (!this.ClienteRepository.listaClientePorId(idNumber)) {
            throw new ErrorApp(404,"Nenhum registro encontrado");
        }
        return this.ClienteRepository.listaClientePorId(idNumber)
    }

    cadastraCliente(clienteData: any) {
        if (!clienteData.cpf || !clienteData.nome || !clienteData.telefone) {
            throw new ErrorApp(400,"Dados faltantes");
        }
        if (this.ClienteRepository.existeCpf(clienteData.cpf)) {
            throw new ErrorApp(409,"cpf já cadastrado");
        }
        const novoCliente = new Cliente(clienteData.nome, clienteData.telefone, clienteData.cpf, clienteData.email, clienteData.cidade)
        this.ClienteRepository.adicionaCliente(novoCliente)
        return novoCliente
    }

    atualizaCliente(clienteData: any, id_cliente: any) {
        clienteData.id_cliente = id_cliente;
        const cadastroAntigo = this.ClienteRepository.listaClientePorId(id_cliente)

        if (!cadastroAntigo) {
            throw new ErrorApp(404,"Cliente não encontrado");
        }
        if (!clienteData.nome || !clienteData.telefone || !clienteData.cpf) {
            throw new ErrorApp(400,"Dados faltantes");
        }

        if (this.ClienteRepository.existeCpf(clienteData.cpf) && cadastroAntigo.cpf != clienteData.cpf) {
            throw new ErrorApp(409,"cpf já cadastrado");
        }
        return this.ClienteRepository.atualizaCliente(clienteData)
    }

    deletaCliente(id: any) {
        if (!this.ClienteRepository.listaClientePorId(id)) {
            throw new ErrorApp(404,"Cliente não encontrado");
        }
        if (this.NotFiscalRepository.existeNotaPorCliente(id)) {
            throw new ErrorApp(422,"Cliente possuí notas emitidas em seu nome")
        }
        this.ClienteRepository.deletaCliente(id)
    }
    listaNotasPorCliente(id: number) {
        if (!this.ClienteRepository.listaClientePorId(id)) {
            throw new ErrorApp(404,"Cliente não encontrado")
        }
        if (this.NotFiscalRepository.listaNotasPorCliente(id).length === 0) {
            throw new ErrorApp(404,"Não existe notas para esse cliente")
        }
        return this.NotFiscalRepository.listaNotasPorCliente(id)
    }
}


