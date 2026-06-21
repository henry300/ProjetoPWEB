import { Cliente } from "../models/Cliente";
import { executarComandoSQL } from "../database/mysql";


export class ClienteRepository {
    private static instance: ClienteRepository;

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

    async listaClientes(): Promise<Cliente[]> {
        const linha = await executarComandoSQL(
            "SELECT * FROM Cliente",
            []
        );
        const clientes: Cliente[] = linha.map((linha: any) => {
            return new Cliente(linha.id_cliente, linha.nome, linha.telefone, linha.cpf, linha.email, linha.cidade);
        })
        return clientes;
    }

    async listaClientePorId(id: number): Promise<Cliente | null> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM Cliente WHERE id_cliente = ?",
            [id]
        );

        return resultado.length > 0 ? resultado[0] : null;
    }

    async existeCpf(cpf: string): Promise<Boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM Cliente WHERE cpf = ?",
            [cpf]
        );

        return resultado.length > 0;
    }

    async adicionaCliente(cliente: Cliente): Promise<boolean> {

        await executarComandoSQL(
            `INSERT INTO Cliente (id_cliente, nome, telefone, cpf, email, cidade)
                VALUES (?, ?, ?, ?, ?, ?)`,
            [cliente.id_cliente, cliente.nome, cliente.telefone, cliente.cpf, cliente.email, cliente.cidade]
        );
        return true;
    }

    async atualizaCliente(clienteAtualizado: Cliente): Promise<boolean> {

        await executarComandoSQL(
            `UPDATE Cliente
             SET id_cliente = ?,
                 nome = ?,
                 telefone = ?,
                 cpf = ?,
                 email = ?,
                 cidade = ?
             WHERE id_cliente = ?`,
            [clienteAtualizado.id_cliente, clienteAtualizado.nome, clienteAtualizado.telefone, clienteAtualizado.cpf, clienteAtualizado.email, clienteAtualizado.cidade]
        );

        return true;
    }

    async deletaCliente(id_carro: number): Promise<boolean> {
        await executarComandoSQL(
            "DELETE FROM Cliente WHERE id_cliente = ?",
            [id_carro]
        );
        return true;
    }
}