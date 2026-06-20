import { Carro } from "../models/Carro";

export class CarroRepository {
    private static instance: CarroRepository;
    private CarroList: Carro[] = []

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

    listaCarros(): Carro[] {
        return this.CarroList;
    }

    listaCarroPorId(id: number): Carro | undefined {
        return this.CarroList.find(carro => carro.id_carro == id)
    }
    cadastraCarro(carro: Carro) {
        this.CarroList.push(carro)
    }

    deletarCarro(id_carro: number) {
        const index: number = this.CarroList.findIndex(carro => carro.id_carro == id_carro)
        this.CarroList.splice(index, 1)
    }

    existePlaca(placa: string): boolean {
        return this.CarroList.some(c => c.placa == placa)
    }

    atualizarCarro(carroAtualizado: Carro): Carro {
        const index: number = this.CarroList.findIndex(carro => carro.id_carro == carroAtualizado.id_carro)
        this.CarroList[index] = carroAtualizado
        return carroAtualizado;
    }
}