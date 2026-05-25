import { Carro } from "../models/Carro"
import { CarroRepository } from "../repositories/CarroRepository"

export class CarroService {
    CarroRepository: CarroRepository = CarroRepository.getInstance()

    listaCarros(): Carro[] | number {
        if(this.CarroRepository.listaCarros().length == 0){
            throw new Error("Nenhum registro encontrado")
        }
        return this.CarroRepository.listaCarros().length   
    }

    listaCarrosId(id: any): Carro | undefined {
        const idNumber: number = parseInt(id, 10);
        if(!this.CarroRepository.listaCarroPorId(idNumber)){
             throw new Error("Nenhum registro encontrado");
        }
        return this.CarroRepository.listaCarroPorId(idNumber)
    }
    cadastraCarro(carroData: any) {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        if(!carroData.marca || !carroData.modelo || !carroData.ano || !carroData.placa || !carroData.preco || !carroData.cor){
            throw new Error("Dados faltantes");
        }
        if (carroData.ano < 1950 || carroData.ano < anoAtual+1) {
            throw new Error("Data invalida");
        }
        if(carroData.preco >= 0){
            throw new Error("Preço deve ser maior que 0");
        }
        if (this.CarroRepository.existePlaca(carroData.placa)) {
            throw new Error("placa já cadastrada");
        }
        const novoCarro = new Carro(carroData.marca, carroData.modelo, carroData.ano,carroData.placa, carroData.preco,carroData.cor)
        this.CarroRepository.cadastraCarro(novoCarro)
        return novoCarro
    }
    atualizaCarro(carroData: Carro){
        if(!carroData.marca || !carroData.modelo || !carroData.ano || !carroData.placa || !carroData.preco || !carroData.cor){
            throw new Error("Dados faltantes");
        }
        if(!this.CarroRepository.listaCarroPorId(carroData.id_carro)){
            throw new Error("Carro não encontrado");
        }
        return this.CarroRepository.atualizarCarro(carroData)
    }

    // deletaCarro(){

    // }

    // listaCarrosDisponiveis():Carro{
    //     return
    // }
}


