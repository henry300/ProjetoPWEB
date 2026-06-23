import { Cliente } from "../models/Cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"
import { ErrorApp } from "../models/Error";

export class ClienteService {
    NotFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    ClienteRepository: ClienteRepository = ClienteRepository.getInstance();

    async listaClientes(): Promise<Cliente[] | number> {
        return await this.ClienteRepository.listaClientes()
    }

    async listaClientePorId(id: any): Promise<Cliente | null> {
        const idNumber: number = parseInt(id, 10);
        if (!await this.ClienteRepository.listaClientePorId(idNumber)) {
            throw new ErrorApp(404, "Nenhum registro encontrado");
        }

        return await this.ClienteRepository.listaClientePorId(idNumber)
    }

    async cadastraCliente(clienteData: any) {
        if (!clienteData.cpf || !clienteData.nome || !clienteData.telefone) {
            throw new ErrorApp(400, "Dados faltantes");
        }

        if (await this.ClienteRepository.existeCpf(clienteData.cpf)) {
            throw new ErrorApp(409, "cpf já cadastrado");
        }


        const novoCliente = new Cliente(clienteData.id_cliente, clienteData.nome, clienteData.telefone, clienteData.cpf, clienteData.email, clienteData.cidade);

        return await this.ClienteRepository.adicionaCliente(novoCliente);
    }

    async atualizaCliente(clienteData: any, id_cliente: any) {
        clienteData.id_cliente = id_cliente;

        const cadastroAntigo = await this.ClienteRepository.listaClientePorId(id_cliente);

        if (!cadastroAntigo) {
            throw new ErrorApp(404, "Cliente não encontrado");
        }

        if (!clienteData.nome || !clienteData.telefone || !clienteData.cpf) {
            throw new ErrorApp(400, "Dados faltantes");
        }

        if (await this.ClienteRepository.existeCpf(clienteData.cpf) && cadastroAntigo.cpf != clienteData.cpf) 
        {
            throw new ErrorApp(409, "cpf já cadastrado");
        }

        return await this.ClienteRepository.atualizaCliente(clienteData);
    }

    async deletaCliente(id: any) {
        if (!await this.ClienteRepository.listaClientePorId(id)) {
            throw new ErrorApp(404, "Cliente não encontrado");
        }

        if (await this.NotFiscalRepository.existeNotaPorCliente(id)) {
            throw new ErrorApp(422, "Cliente possuí notas emitidas em seu nome");
        }

        await this.ClienteRepository.deletaCliente(id);
    }

    async listaNotasPorCliente(id: number) {
        if (!await this.ClienteRepository.listaClientePorId(id)) {
            throw new ErrorApp(404, "Cliente não encontrado");
        }

        if ((await this.NotFiscalRepository.listaNotasPorCliente(id)).length === 0) {
            throw new ErrorApp(404, "Não existe notas para esse cliente");
        }

        return await this.NotFiscalRepository.listaNotasPorCliente(id);
    }
}


