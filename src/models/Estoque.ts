export class Cliente{
    id_estoque: number
    id_carro: string
    quantidade: number
    localizacao: string
    data_entrada: Date

    constructor(id_carro: string,quantidade: number,localizacao: string,data_entrada: Date){
        this.id_estoque = this.geraId()
        this.id_carro = id_carro
        this.quantidade = quantidade
        this.localizacao = localizacao
        this.data_entrada = data_entrada
    }

    private geraId():number{
        return Date.now();
    }
}