import { Cliente } from "../models/Cliente";

const clientes: Cliente[] = [];

export function listarClientes(): Cliente[] {
    return clientes;
}

export function clientePorId(id: number): Cliente | undefined {
    return clientes.find(c => c.id_cliente === id);
}

export function clientePorCpf(cpf: string): Cliente | undefined {
    return clientes.find(c => c.cpf === cpf);
}

export function adicionarCliente(cliente: Cliente): Cliente {
    clientes.push(cliente);
    return cliente;
}

export function removerCliente(id: number): boolean {
    const index = clientes.findIndex(c => c.id_cliente === id);
    if (index === -1) return false;
    clientes.splice(index, 1);
    return true;
}

export function atualizarCliente(clienteAtualizado: Cliente): Cliente | undefined {
    const index = clientes.findIndex(c => c.id_cliente === clienteAtualizado.id_cliente);
    if (index === -1) return undefined;
    clientes[index] = clienteAtualizado;
    return clientes[index];
}