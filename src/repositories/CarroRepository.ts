import { Carro } from "../models/Carro.ts";

export class CarroRepository{
    private static instance: CarroRepository;
    private CarroList: Carro[] = []

    private constructor(){}

    public static getInstance():CarroRepository{
        if(!this.instance){
            this.instance=new CarroRepository()
        }
        return this.instance
    }
    
    listaCarros(id:number): Carro[]{
        return this.CarroList;
    }
    listaCarroPorId(id:number): Carro | undefined{
        return this.CarroList.find(carro=>carro.id_carro == id)
    }
    cadastraCarro(carro:Carro){
        this.CarroList.push(carro)
    }
    deletarCarro(index:number){
        this.CarroList.splice(index,1)
    }
}