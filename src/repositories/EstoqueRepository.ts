import { Estoque } from "../models/Estoque";
import { executarComandoSQL } from "../database/mysql";

export class EstoqueRepository {
    private static instance: EstoqueRepository;

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Estoque (
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

    async listaEstoque(): Promise<Estoque[]> {
        const linha = await executarComandoSQL(
            "SELECT * FROM estoque",
            []
        );

        const Estoques: Estoque[] = linha.map((linha: any) => {
            return new Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada);
        })
        return Estoques;
    }

    async listaEstoquePorId(id: number): Promise<Estoque | null> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM estoque WHERE id_estoque = ?",
            [id]
        );

        return resultado.length > 0 ? resultado[0] : null;
    }

    async existeEstoque(id: number): Promise<Boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM estoque WHERE id_estoque = ?",
            [id]
        );

        return resultado.length > 0;
    }
    async listaEstoquePorIdCarro(id: number): Promise<Estoque | undefined> {
        const linha = await executarComandoSQL(
            "SELECT * FROM estoque where id_carro = ?",
            [id]
        );

        const Estoques: Estoque[] = linha.map((linha: any) => {
            return new Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada);
        })
        return Estoques[0];
    }

    async cadastraEstoque(Estoque: Estoque): Promise<Estoque> {

        await executarComandoSQL(
            `INSERT INTO Estoque (id_carro, quantidade, localizacao_patio, data_entrada)
                VALUES (?, ?, ?, ?)`,
            [Estoque.id_carro, Estoque.quantidade, Estoque.localizacao_patio, Estoque.data_entrada]
        );
        return await executarComandoSQL(`SELECT * FROM estoque WHERE id_estoque = LAST_INSERT_ID()`,[])
    }

    async deletarEstoque(id: number): Promise<boolean> {
        await executarComandoSQL(
            "DELETE FROM estoque WHERE id_estoque = ?",
            [id]
        );
        return true;
    }

    async atualizarEstoque(EstoqueAtualizado: Estoque): Promise<boolean> {

        await executarComandoSQL(
            `UPDATE estoque
             SET 
                 quantidade = ?,
                 localizacao_patio = ?
             WHERE id_estoque = ?`,
            [EstoqueAtualizado.quantidade, EstoqueAtualizado.localizacao_patio, EstoqueAtualizado.data_entrada,EstoqueAtualizado.id_estoque]
        );
         return await executarComandoSQL(`SELECT * FROM estoque WHERE id_estoque = ?`,[EstoqueAtualizado.id_estoque])
    }
}
