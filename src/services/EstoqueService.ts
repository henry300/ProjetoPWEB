import { Estoque } from "../models/Estoque"
import { CarroRepository } from "../repositories/CarroRepository";
import { EstoqueRepository } from "../repositories/EstoqueRepository"

export class EstoqueService {
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
    CarroRespository:CarroRepository = CarroRepository.getInstance();

    listaEstoques(): Estoque[] | number {
        if(this.EstoqueRepository.listaEstoque().length == 0){
            throw new Error("Nenhum registro encontrado")
        }
        return this.EstoqueRepository.listaEstoque()   
    }

    listaEstoquesId(id: any): Estoque | undefined {
        const idNumber: number = parseInt(id, 10);
        if(!this.EstoqueRepository.listaEstoquePorId(idNumber)){
             throw new Error("Nenhum registro encontrado");
        }
        return this.EstoqueRepository.listaEstoquePorId(idNumber)
    }

    listaEstoquesIdCarro(id: number): number | undefined {
        if(!this.EstoqueRepository.listaEstoquePorIdCarro(id)){
             throw new Error("Nenhum registro encontrado");
        }
        const estoque = this.EstoqueRepository.listaEstoquePorIdCarro(id)
        return estoque?.quantidade
    }

    cadastraEstoque(EstoqueData: any) {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        if(!EstoqueData.id_carro || !EstoqueData.quantidade || !EstoqueData.localizacao_patio || !EstoqueData.data_entrada){
            throw new Error("Dados faltantes");
        }
        if(this.EstoqueRepository.existeEstoque(EstoqueData.id_carro)){
            throw new Error("Carro já possuí um estoque ativo");
        }
        if(!this.CarroRespository.listaCarroPorId(EstoqueData.id_carro)){
            throw new Error("Carro não encontrado");
        }
        if (EstoqueData.data_entrada < anoAtual) {
            throw new Error("Data invalida");
        }
        if(EstoqueData.quantidade < 0){
            throw new Error("Quantidade deve ser igual ou maior que 0");
        }
        const novoEstoque = new Estoque(EstoqueData.id_carro, EstoqueData.quantidade, EstoqueData.localizacao,EstoqueData.data_entrada)
        this.EstoqueRepository.cadastraEstoque(novoEstoque)
        return novoEstoque
    }

    atualizaEstoque(EstoqueData: Estoque,id_estoque:number){
        EstoqueData.id_estoque = id_estoque;
        if(!EstoqueData.id_carro || !EstoqueData.quantidade || !EstoqueData.localizacao_patio || !EstoqueData.data_entrada){
            throw new Error("Dados faltantes");
        }
        if(!this.EstoqueRepository.listaEstoquePorId(EstoqueData.id_estoque)){
            throw new Error("Estoque não encontrado");
        }
        return this.EstoqueRepository.atualizarEstoque(EstoqueData)
    }

    deletaCarro(id:number):void{
        if(!this.EstoqueRepository.listaEstoquePorIdCarro(id)){
             throw new Error("Estoque não encontrado");
        }
        this.EstoqueRepository.deletarEstoque(id)
    }
}