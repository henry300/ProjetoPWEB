import { Estoque } from "../models/Estoque"
import { CarroRepository } from "../repositories/CarroRepository";
import { EstoqueRepository } from "../repositories/EstoqueRepository"
import { ErrorApp } from "../models/Error";

export class EstoqueService {
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
    CarroRespository: CarroRepository = CarroRepository.getInstance();

    listaEstoques(): Estoque[] | number {
        return this.EstoqueRepository.listaEstoque()
    }

    listaEstoquesId(id: number): Estoque | undefined {
        if (!this.EstoqueRepository.listaEstoquePorId(id)){
            throw new ErrorApp(404,"Nenhum registro encontrado");
        }
        return this.EstoqueRepository.listaEstoquePorId(id)
    }

    listaEstoquesIdCarro(id: number): number | undefined {
        if (!this.EstoqueRepository.listaEstoquePorIdCarro(id)) {
            throw new ErrorApp(404,"Nenhum registro encontrado");
        }
        const estoque = this.EstoqueRepository.listaEstoquePorIdCarro(id)
        return estoque?.quantidade
    }

    cadastraEstoque(EstoqueData: any) {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const dataEstoque= new Date(EstoqueData.data_entrada)

        if (dataEstoque > dataAtual || isNaN(dataEstoque.getTime())) {
            throw new ErrorApp(400,"Data de emissão esta incorreta");
        }
        if (!EstoqueData.id_carro || !EstoqueData.quantidade || !EstoqueData.localizacao_patio || !EstoqueData.data_entrada) {
            throw new ErrorApp(400,"Dados faltantes");
        }
        if (this.EstoqueRepository.existeEstoque(EstoqueData.id_carro)) {
            throw new ErrorApp(409,"Carro já possuí um estoque ativo");
        }
        if (!this.CarroRespository.listaCarroPorId(EstoqueData.id_carro)) {
            throw new ErrorApp(404,"Carro não encontrado");
        }
        if (EstoqueData.quantidade < 0) {
            throw new ErrorApp(400,"Quantidade deve ser igual ou maior que 0");
        }
        const novoEstoque = new Estoque(EstoqueData.id_carro, EstoqueData.quantidade, EstoqueData.localizacao_patio, EstoqueData.data_entrada)
        this.EstoqueRepository.cadastraEstoque(novoEstoque)
        return novoEstoque
    }

    listaEstoquePorIdCarro(id: number) {
        return this.EstoqueRepository.listaEstoquePorIdCarro(id)
    }

    atualizaEstoque(EstoqueData: Estoque, id_estoque: number) {
        EstoqueData.id_estoque = id_estoque;
        if (!EstoqueData.id_carro || EstoqueData.quantidade == undefined || !EstoqueData.localizacao_patio || !EstoqueData.data_entrada) {
            throw new ErrorApp(400,"Dados faltantes");
        }
        if (EstoqueData.quantidade < 0) {
            throw new ErrorApp(422,"Quantidade não pode ser negativo");
        }
        if (!this.EstoqueRepository.listaEstoquePorId(EstoqueData.id_estoque)) {
            throw new ErrorApp(404,"Estoque não encontrado");
        }
        return this.EstoqueRepository.atualizarEstoque(EstoqueData)
    }

    deletarEstoque(id: number): void {
        if (!this.EstoqueRepository.listaEstoquePorId(id)) {
            throw new ErrorApp(404,"Estoque não encontrado");
        }
        this.EstoqueRepository.deletarEstoque(id)
    }
    
    existeEstoque(id_carro: number) {
        return this.EstoqueRepository.existeEstoque(id_carro)
    }
}