import { NotaFiscal } from "../models/NotaFiscal";
import { executarComandoSQL } from "../database/mysql";

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository;
    private notaFiscalList: NotaFiscal[] = []

    static getCreateTableQuery(): string {
        return `
    CREATE TABLE IF NOT EXISTS NotaFiscal (
        id_nota INT AUTO_INCREMENT PRIMARY KEY,
        numero_nota VARCHAR(50) NOT NULL UNIQUE,
        data_emissao DATE NOT NULL,
        valor_total DECIMAL(10,2) NOT NULL,
        id_cliente INT NOT NULL,
        id_vendedor INT NOT NULL,
        id_carro INT NOT NULL,

        FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
        FOREIGN KEY (id_vendedor) REFERENCES Vendedor(id_vendedor),
        FOREIGN KEY (id_carro) REFERENCES Carro(id_carro)
    );`;
    }

    private constructor() { }

    public static getInstance(): NotaFiscalRepository {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }
    async listaNotas(): Promise<NotaFiscal[]> {
        const linha = await executarComandoSQL(
            "SELECT * FROM notafiscal",
            []
        );

        const notas: NotaFiscal[] = linha.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
        })
        return notas;
    }

    async listaNotaPorId(id: number): Promise<NotaFiscal | null> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM notafiscal WHERE id_nota = ?",
            [id]
        );

        return resultado.length > 0 ? resultado[0] : null;
    }

    async listaNotasPorCliente(id_cliente: number): Promise<NotaFiscal[]> {
        const linha = await executarComandoSQL(
            "SELECT * FROM notafiscal where id_cliente = ?",
            [id_cliente]
        );

        const notas: NotaFiscal[] = linha.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
        })
        return notas;
    }

    async listaNotasPorVendedor(id_vendedor: number): Promise<NotaFiscal[]> {
        const linha = await executarComandoSQL(
            "SELECT * FROM notafiscal where id_vendedor = ?",
            [id_vendedor]
        );

        const notas: NotaFiscal[] = linha.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
        })
        return notas;
    }

    async existeNotaPorCliente(id_cliente: number): Promise<Boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM notafiscal where id_cliente = ?",
            [id_cliente]
        );

        return resultado.length > 0;
    }

    async existeNotaPorVendedor(id_vendedor: number): Promise<Boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM notafiscal where id_vendedor = ?",
            [id_vendedor]
        );

        return resultado.length > 0;
    }

    async existeNotaPorCarro(id_carro: number): Promise<Boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM notafiscal where id_carro = ?",
            [id_carro]
        );

        return resultado.length > 0;
    }

    async existeNumeroNota(numero_nota: string): Promise<Boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM notafiscal where numero_nota = ?",
            [numero_nota]
        );

        return resultado.length > 0;
    }

    async adicionaNota(nota: NotaFiscal): Promise<boolean> {

        await executarComandoSQL(
            `INSERT INTO notafiscal (numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro)
                VALUES (?, ?, ?, ?, ?, ?)`,
            [nota.numero_nota, nota.data_emissao, nota.valor_total, nota.id_cliente, nota.id_vendedor, nota.id_carro]
        );
        return true;
    }
}