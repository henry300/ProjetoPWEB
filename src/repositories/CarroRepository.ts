import { Carro } from "../models/Carro";
import { executarComandoSQL } from "../database/mysql";

export class CarroRepository {
    private static instance: CarroRepository;

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE Carro (
            id_carro INT AUTO_INCREMENT PRIMARY KEY,
            marca VARCHAR(50) NOT NULL,
            modelo VARCHAR(50) NOT NULL,
            ano INT NOT NULL,
            placa VARCHAR(10) NOT NULL UNIQUE,
            preco DECIMAL(10,2) NOT NULL,
            cor VARCHAR(30)
        );`;
    }

    private constructor() { }

    public static getInstance(): CarroRepository {
        if (!this.instance) {
            this.instance = new CarroRepository()
        }
        return this.instance
    }

    async listaCarros(): Promise<Carro[]> {
        const linha = await executarComandoSQL(
            "SELECT * FROM Carro",
            []
        );

        const carros: Carro[] = linha.map((linha: any) => {
            return new Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor);
        })
        return carros;
    }

    async listaCarroPorId(id: number): Promise<Carro | null> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM Carro WHERE id_carro = ?",
            [id]
        );

        return resultado.length > 0 ? resultado[0] : null;
    }

    async cadastraCarro(carro: Carro): Promise<void> {

        await executarComandoSQL(
            `INSERT INTO Carro (id_carro, marca, modelo, ano, placa, preco, cor)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [carro.id_carro, carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor]
        );
    }

    async deletarCarro(id_carro: number): Promise<boolean> {

        await executarComandoSQL(
            "DELETE FROM Carro WHERE id_carro = ?",
            [id_carro]
        );
        return true;
    }

    async existePlaca(placa: string): Promise<boolean> {

        const resultado = await executarComandoSQL(
            "SELECT * FROM Carro WHERE placa = ?",
            [placa]
        );

        return resultado.length > 0;
    }

    async atualizarCarro(carroAtualizado: Carro): Promise<void> {

        await executarComandoSQL(
            `UPDATE Carro
             SET marca = ?,
                 modelo = ?,
                 ano = ?,
                 placa = ?,
                 preco = ?,
                 cor = ?
             WHERE id_carro = ?`,
            [carroAtualizado.marca, carroAtualizado.modelo, carroAtualizado.ano, carroAtualizado.placa, carroAtualizado.preco, carroAtualizado.cor, carroAtualizado.id_carro]
        );
    }
}