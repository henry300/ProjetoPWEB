import { Estoque } from "../models/Estoque";

export class EstoqueRepository{
    private static instance: EstoqueRepository;
    private EstoqueList: Estoque[] = []

    private constructor(){}

    public static getInstance():EstoqueRepository{
        if(!this.instance){
            this.instance=new EstoqueRepository()
        }
        return this.instance
    }

    listaEstoque(): Estoque[]{
        return this.EstoqueList;
    }
    listaEstoquePorId(id:number): Estoque | undefined{
        return this.EstoqueList.find(estoque=>estoque.id_estoque == id)
    }
    cadastraEstoque(Estoque:Estoque){
        this.EstoqueList.push(Estoque)
    }
    deletarEstoque(index:number){
        this.EstoqueList.splice(index,1)
    }
    atualizarEstoque(EstoqueAtualizado:Estoque): Estoque{
        const index:number = this.EstoqueList.findIndex(estoque=>estoque.id_carro == EstoqueAtualizado.id_carro)
        if(this.EstoqueList[index]){
            this.EstoqueList[index].quantidade = EstoqueAtualizado.quantidade ?? this.EstoqueList[index].quantidade
            this.EstoqueList[index].localizacao = EstoqueAtualizado.localizacao ?? this.EstoqueList[index].localizacao
        }
        return EstoqueAtualizado;
    }
}