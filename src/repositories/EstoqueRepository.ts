import { Estoque } from "../models/Estoque";

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private EstoqueList: Estoque[] = []

    static getCreateTableQuery(): string {
    return `
        CREATE TABLE Estoque (
            id_estoque INT AUTO_INCREMENT PRIMARY KEY,
            id_carro INT NOT NULL,
            quantidade INT NOT NULL,
            localizacao_patio VARCHAR(100),
            data_entrada DATE,

            FOREIGN KEY (id_carro) REFERENCES Carro(id_carro)
        );`;
    }

    private constructor() { }

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository()
        }
        return this.instance
    }

    existeEstoque(id: number): boolean {
        return this.EstoqueList.some(estoque => estoque.id_carro === id)
    }

    listaEstoque(): Estoque[] {
        return this.EstoqueList;
    }

    listaEstoquePorId(id: number): Estoque | undefined {
        return this.EstoqueList.find(estoque => estoque.id_estoque == id)
    }

    listaEstoquePorIdCarro(id: number): Estoque | undefined {
        return this.EstoqueList.find(estoque => estoque.id_carro === id)
    }

    cadastraEstoque(Estoque: Estoque) {
        this.EstoqueList.push(Estoque)
    }

    deletarEstoque(id: number) {
        const index: number = this.EstoqueList.findIndex(estoque => estoque.id_estoque == id)
        this.EstoqueList.splice(index, 1)
    }
    
    atualizarEstoque(EstoqueAtualizado: Estoque): Estoque {
        const index: number = this.EstoqueList.findIndex(estoque => estoque.id_estoque == EstoqueAtualizado.id_estoque)
        if (this.EstoqueList[index]) {
            this.EstoqueList[index].quantidade = EstoqueAtualizado.quantidade ?? this.EstoqueList[index].quantidade
            this.EstoqueList[index].localizacao_patio = EstoqueAtualizado.localizacao_patio ?? this.EstoqueList[index].localizacao_patio
        }
        return EstoqueAtualizado;
    }
}
