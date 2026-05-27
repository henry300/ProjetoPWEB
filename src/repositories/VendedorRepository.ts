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
    
}

