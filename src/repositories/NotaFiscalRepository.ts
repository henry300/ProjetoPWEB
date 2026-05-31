import { NotaFiscal } from "../models/NotaFiscal";

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository;
    private notaFiscalList: NotaFiscal[] = [];

    private constructor() { }

    public static getInstance(): NotaFiscalRepository {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }

    listaNotas(): NotaFiscal[] {
        return this.notaFiscalList;
    }

    listaNotaPorId(id: number): NotaFiscal | undefined {
        return this.notaFiscalList.find(nota => nota.id_nota === id);
    }

    listaNotasPorCliente(id_cliente: number): NotaFiscal[] {
        return this.notaFiscalList.filter(nota => nota.id_cliente === id_cliente);
    }

    listaNotasPorVendedor(id_vendedor: number): NotaFiscal[] {
        return this.notaFiscalList.filter(nota => nota.id_vendedor === id_vendedor);
    }

    existeNotaPorCliente(id_cliente: number): boolean {
        return this.notaFiscalList.some(nota => nota.id_cliente === id_cliente);
    }

    existeNotaPorVendedor(id_vendedor: number): boolean {
        return this.notaFiscalList.some(nota => nota.id_vendedor === id_vendedor);
    }

    existeNotaPorCarro(id_carro: number): boolean {
        return this.notaFiscalList.some(nota => nota.id_carro === id_carro);
    }

    existeNumeroNota(numero_nota: string): boolean {
        return this.notaFiscalList.some(nota => nota.numero_nota === numero_nota);
    }

    adicionaNota(nota: NotaFiscal): NotaFiscal {
        this.notaFiscalList.push(nota);
        return nota
    }
}