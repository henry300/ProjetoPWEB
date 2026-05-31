import { NotaFiscal } from "../models/NotaFiscal"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"
import { ClienteRepository } from "../repositories/clienteRepository"
import { VendedorRepository } from "../repositories/VendedorRepository"
import { CarroRepository } from "../repositories/CarroRepository"
import { EstoqueRepository } from "../repositories/EstoqueRepository"


export class NotaFiscalService{
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    ClienteRepository: ClienteRepository = ClienteRepository.getInstance()
    VendedorRepository: VendedorRepository = VendedorRepository.getInstance()
    CarroRepository: CarroRepository = CarroRepository.getInstance()
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
   
    listaNotas(): NotaFiscal[] | number{
        if(this.NotaFiscalRepository.listaNotas().length == 0){
            throw new Error("Nenhum registro encontrado")
        }
        return this.NotaFiscalRepository.listaNotas()  
    }


    listaNotaPorId(id: number){
        if(!this.NotaFiscalRepository.listaNotaPorId(id)){
             throw new Error("Nenhum registro encontrado");
        }
        return this.NotaFiscalRepository.listaNotaPorId(id)
    }

    emiteNota(notaData: NotaFiscal){
        const dataAtual = new Date();

        if(!notaData.data_emissao || !notaData.valor_total || !notaData.id_cliente || !notaData.id_vendedor || !notaData.id_carro){
            throw new Error("Dados faltantes");
        }
        const dataNota = new Date(notaData.data_emissao)

        if(dataNota > dataAtual){
             throw new Error("Data de emissão esta incorreta");
        }

        if(notaData.valor_total <= 0){
            throw new Error("Valor Total deve ser maior que zero");
        }

        const carros = this.CarroRepository.listaCarros()
        const carrosDisponiveis = carros.filter(carro=>this.EstoqueRepository.listaEstoquePorIdCarro(carro.id_carro)?.quantidade != 0)

        if(!carrosDisponiveis.find(carro => carro.id_carro == notaData.id_carro)){
            throw new Error("Carro nnão esta disponivel");
        }
        if(!this.ClienteRepository.listaClientePorId(notaData.id_cliente)){
             throw new Error("Cliente não cadastrado");
        }
        if(!this.VendedorRepository.listaVendedorPorId(notaData.id_vendedor)){
             throw new Error("Vendedor não cadastrado");
        }

        if(!this.EstoqueRepository.existeEstoque(notaData.id_carro)){
             throw new Error("Valor de estoque deve ser maior que zero");
        }
        const carro = carrosDisponiveis.find(carro => carro.id_carro == notaData.id_carro)
        const estoque = this.EstoqueRepository.listaEstoquePorIdCarro(carro?.id_carro ?? 0)
        if(estoque?.quantidade != undefined)  {
            estoque.quantidade --
            this.EstoqueRepository.atualizarEstoque(estoque)
        }
        const novaNota = new NotaFiscal(notaData.numero_nota,notaData.data_emissao,notaData.valor_total,notaData.id_cliente,notaData.id_vendedor,notaData.id_carro)
        return this.NotaFiscalRepository.adicionaNota(novaNota)
    }
}

