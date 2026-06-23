import { Vendedor } from '../models/vendedor';
import { executarComandoSQL } from "../database/mysql";

export class VendedorRepository {
    private static instance: VendedorRepository;

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Vendedor (
            id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            matricula VARCHAR(50) NOT NULL UNIQUE,
            comissao_percentual DECIMAL(5,2)
        );`;
    }


    private constructor() { }

    public static getInstance(): VendedorRepository {
        if (!this.instance) {
            this.instance = new VendedorRepository()
        }
        return this.instance;
    }

    async ListaVendedor(): Promise<Vendedor[]> {
        const linha = await executarComandoSQL(
            "SELECT * FROM Vendedor",
            []
        );
        const vendedores: Vendedor[] = linha.map((linha: any) => {
            return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, linha.comissao_percentual);
        })
        return vendedores;
    }

    async listaVendedorPorId(id: number): Promise<Vendedor | null> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM Vendedor WHERE id_vendedor = ?",
            [id]
        );

        return resultado.length > 0 ? resultado[0] : null;
    }

    async CadastraVendedor(vendedor: Vendedor): Promise<boolean> {

        await executarComandoSQL(
            `INSERT INTO vendedor (nome, matricula, comissao_percentual)
                VALUES (?, ?, ?)`,
            [vendedor.nome, vendedor.matricula, vendedor.comissao_percentual]
        );
        return true;
    }

    async DeletarVendedor(id: number): Promise<boolean> {
        await executarComandoSQL(
            "DELETE FROM vendedor WHERE id_vendedor = ?",
            [id]
        );
        return true;
    }

    async atualizaVendedor(vendedorAtualizado: Vendedor): Promise<boolean> {

        await executarComandoSQL(
            `UPDATE Vendedor
             SET nome = ?,
                matricula = ?,
                comissao_percentual = ?
             WHERE id_vendedor = ?;`,
            [vendedorAtualizado.nome, vendedorAtualizado.matricula, vendedorAtualizado.comissao_percentual,vendedorAtualizado.id_vendedor]
        );

        return true;
    }

     async existeMatricula(matricula: string): Promise<Boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM vendedor where matricula = ?;",
            [matricula]
        );

        return resultado.length > 0;
    }
}

