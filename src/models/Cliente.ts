export class Cliente {
    id_cliente: number
    nome: string
    telefone: string
    cpf: string
    email: string
    cidade: string

    constructor(nome: string, telefone: string, cpf: string, email: string, cidade: string) {
        this.id_cliente = this.geraId()
        this.nome = nome
        this.telefone = telefone
        this.cpf = cpf
        this.email = email
        this.cidade = cidade
    }

    private geraId(): number {
        return Date.now();
    }
}