import {Vendedor} from '../models/vendedor';

export class VendedorRepository{
    private static instance: VendedorRepository;
    private VendedorList: Vendedor[] = []

    private constructor(){}

    public static getInstance():VendedorRepository{
        if(!this.instance){
            this.instance= new VendedorRepository()
        }
        return this.instance;
    }

    ListaVendedor(): Vendedor[]{
        return this.VendedorList;
    }
    listaVendedorPorId(id:number): Vendedor | undefined{
        return this.VendedorList.find(vendedor=>vendedor.id_vendedor == id)
    }
    CadastraVendedor(vendedor:Vendedor){
        this.VendedorList.push(vendedor)
    }
    DeletarVendedor(id: number){
        const indice = this.VendedorList.findIndex(vendedor => vendedor.id_vendedor == id)
        this.VendedorList.splice(indice, 1)
    }
    existeMatricula(matricula:string):boolean{
        return this.VendedorList.some(vendedor => vendedor.matricula == matricula)
    }
    atualizaVendedor(vendedorAtualizado: Vendedor){
        const index:number = this.VendedorList.findIndex(vendedor=>vendedor.id_vendedor == vendedorAtualizado.id_vendedor)
        this.VendedorList[index] = vendedorAtualizado
        return vendedorAtualizado;
    }
}

