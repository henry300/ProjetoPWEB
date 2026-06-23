import { Carro } from "../models/Carro"
import { CarroRepository } from "../repositories/CarroRepository"
import { EstoqueRepository } from "../repositories/EstoqueRepository"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"
import { ErrorApp } from "../models/Error";
import { Estoque } from "../models/Estoque";

export class CarroService {
    CarroRepository: CarroRepository = CarroRepository.getInstance()
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()

    async listaCarros(): Promise<Carro[] | number> {
        return await this.CarroRepository.listaCarros()
    }

    async listaCarrosId(id: number): Promise<Carro | null> {

        let carro = await this.CarroRepository.listaCarroPorId(id)

        if (carro == null) {
            throw new ErrorApp(404, "Nenhum registro encontrado");
        }
        return carro
    }

    async listaCarrosDisponiveis(): Promise<Carro[]> {
        const estoques = await this.EstoqueRepository.listaEstoque();

        const estoquesDis = estoques.filter(
            estoque => estoque.quantidade != 0
        )
        const carros:Carro[] = [];


        for (const estoque of estoquesDis) {
            const CarroComestoque = await this.CarroRepository.listaCarroPorId(estoque.id_carro);
            if(CarroComestoque != null)
                carros.push(CarroComestoque)
        }
        return carros
    }

    async cadastraCarro(carroData: Carro) {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();

        if (!carroData.marca || !carroData.modelo || !carroData.ano || !carroData.placa || !carroData.preco || !carroData.cor) {
            throw new ErrorApp(400, "Dados faltantes");
        }

        if (carroData.ano < 1950 || carroData.ano > anoAtual + 1) {
            throw new ErrorApp(400, "Data invalida");
        }

        if (carroData.preco <= 0) {
            throw new ErrorApp(400, "Preço deve ser maior que 0");
        }

        if (await this.CarroRepository.existePlaca(carroData.placa)) {
            throw new ErrorApp(409, "placa já cadastrada");
        }

        const novoCarro = new Carro(carroData.id_carro, carroData.marca, carroData.modelo, carroData.ano, carroData.placa, carroData.preco, carroData.cor)

        return await this.CarroRepository.cadastraCarro(novoCarro)
    }

    async atualizaCarro(carroData: Carro, id_carro: number) {
        carroData.id_carro = id_carro;

        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();

        const cadastroAntigo = await this.CarroRepository.listaCarroPorId(id_carro)

        if (!cadastroAntigo) {
            throw new ErrorApp(404, "Carro não encontrado");
        }

        if (!carroData.marca || !carroData.modelo || !carroData.ano || !carroData.placa || !carroData.preco || !carroData.cor) {
            throw new ErrorApp(400, "Dados faltantes");
        }

        if (carroData.ano < 1950 || carroData.ano > anoAtual + 1) {
            throw new ErrorApp(422, "Data invalida");
        }

        if (carroData.preco <= 0) {
            throw new ErrorApp(422, "Preço deve ser maior que 0");
        }

        if (
            await this.CarroRepository.existePlaca(carroData.placa) &&
            cadastroAntigo.placa != carroData.placa
        ) {
            throw new ErrorApp(409, "placa já cadastrada");
        }

        return await this.CarroRepository.atualizarCarro(carroData)
    }

    async deletaCarro(id: number) {
        if (!await this.CarroRepository.listaCarroPorId(id)) {
            throw new ErrorApp(404, "registro não encontrado");
        }

        if (await this.EstoqueRepository.listaEstoquePorIdCarro(id)) {
            throw new ErrorApp(422, "não foi possível apagar, há estoque deste carro");
        }

        if (await this.NotaFiscalRepository.existeNotaPorCarro(id)) {
            throw new ErrorApp(422, "não foi possível apagar, Existem notas emitidas com esse carro");
        }

        const carro = await this.CarroRepository.listaCarroPorId(id)

        await this.CarroRepository.deletarCarro(id)

        return carro
    }
}