import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    private static instance: ClienteRepository;
    private clienteList: Cliente[] = []

    static getCreateTableQuery(): string {
    return `
        CREATE TABLE Cliente (
            id_cliente INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            cpf VARCHAR(14) NOT NULL UNIQUE,
            telefone VARCHAR(20),
            email VARCHAR(100),
            cidade VARCHAR(100)
        );`;
    }

    private constructor() { }

    public static getInstance(): ClienteRepository {
        if (!this.instance) {
            this.instance = new ClienteRepository();
        }
        return this.instance;
    }

    listaClientes(): Cliente[] {
        return this.clienteList;
    }

    listaClientePorId(id: number): Cliente | undefined {
        return this.clienteList.find(c => c.id_cliente === id);
    }

    existeCpf(cpf: string): boolean {
        return this.clienteList.some(c => c.cpf === cpf);
    }

    adicionaCliente(cliente: Cliente): Cliente {
        this.clienteList.push(cliente);
        return cliente;
    }

    atualizaCliente(clienteAtualizado: Cliente): Cliente | undefined {
        const index = this.clienteList.findIndex(c => c.id_cliente === clienteAtualizado.id_cliente);
        if (index === -1) return undefined;
        this.clienteList[index] = clienteAtualizado;
        return this.clienteList[index];
    }

    deletaCliente(id: number): boolean {
        const index = this.clienteList.findIndex(c => c.id_cliente === id);
        if (index === -1) return false;
        this.clienteList.splice(index, 1);
        return true;
    }
}