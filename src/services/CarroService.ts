import { Carro } from "../models/Carro"
import { CarroRepository } from "../repositories/CarroRepository"
import { EstoqueRepository } from "../repositories/EstoqueRepository"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"

export class CarroService {
    CarroRepository: CarroRepository = CarroRepository.getInstance()
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()

    listaCarros(): Carro[] | number {
        if (this.CarroRepository.listaCarros().length == 0) {
            throw new Error("Nenhum registro encontrado")
        }
        return this.CarroRepository.listaCarros()
    }

    listaCarrosId(id: any): Carro | undefined {
        const idNumber: number = parseInt(id, 10);
        if (!this.CarroRepository.listaCarroPorId(idNumber)) {
            throw new Error("Nenhum registro encontrado");
        }
        return this.CarroRepository.listaCarroPorId(idNumber)
    }

    listaCarrosDisponiveis(): Carro[] {
        const carros = this.CarroRepository.listaCarros()
        const carrosDisponiveis = carros.filter(carro => this.EstoqueRepository.listaEstoquePorIdCarro(carro.id_carro)?.quantidade != 0)
        if (carrosDisponiveis.length == 0) {
            throw new Error("Nenhum registro encontrado");
        }
        return carrosDisponiveis
    }

    cadastraCarro(carroData: any) {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        if (!carroData.marca || !carroData.modelo || !carroData.ano || !carroData.placa || !carroData.preco || !carroData.cor) {
            throw new Error("Dados faltantes");
        }
        if (carroData.ano < 1950 || carroData.ano > anoAtual + 1) {
            throw new Error("Data invalida");
        }
        if (carroData.preco <= 0) {
            throw new Error("Preço deve ser maior que 0");
        }
        if (this.CarroRepository.existePlaca(carroData.placa)) {
            throw new Error("placa já cadastrada");
        }
        const novoCarro = new Carro(carroData.marca, carroData.modelo, carroData.ano, carroData.placa, carroData.preco, carroData.cor)
        this.CarroRepository.cadastraCarro(novoCarro)
        return novoCarro
    }

    atualizaCarro(carroData: Carro, id_carro: number) {
        carroData.id_carro = id_carro;
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const cadastroAntigo = this.CarroRepository.listaCarroPorId(id_carro)
        if (!cadastroAntigo) {
            throw new Error("Carro não encontrado");
        }
        if (!carroData.marca || !carroData.modelo || !carroData.ano || !carroData.placa || !carroData.preco || !carroData.cor) {
            throw new Error("Dados faltantes");
        }
        if (carroData.ano < 1950 || carroData.ano > anoAtual + 1) {
            throw new Error("Data invalida");
        }
        if (carroData.preco <= 0) {
            throw new Error("Preço deve ser maior que 0");
        }
        if (this.CarroRepository.existePlaca(carroData.placa) && cadastroAntigo.placa != carroData.placa) {
            throw new Error("placa já cadastrada");
        }
        return this.CarroRepository.atualizarCarro(carroData)
    }

    deletaCarro(id: number) {
        if (!this.CarroRepository.listaCarroPorId(id)) {
            throw new Error("registro não encontrado");
        }
        if (this.EstoqueRepository.listaEstoquePorIdCarro(id)) {
            throw new Error("não foi possível apagar, há estoque deste carro");
        }
        if (this.NotaFiscalRepository.existeNotaPorCarro(id)) {
            throw new Error("não foi possível apagar, Existem notas emitidas com esse carro");
        }
        const carro = this.CarroRepository.listaCarroPorId(id)
        this.CarroRepository.deletarCarro(id)
        return carro
    }

}