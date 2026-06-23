import { NotaFiscal } from "../models/NotaFiscal"
import { NotaFiscalRepository } from "../repositories/NotaFiscalRepository"
import { ClienteRepository } from "../repositories/clienteRepository"
import { VendedorRepository } from "../repositories/VendedorRepository"
import { CarroRepository } from "../repositories/CarroRepository"
import { EstoqueRepository } from "../repositories/EstoqueRepository"
import { ErrorApp } from "../models/Error";
import { Carro } from "../models/Carro";


export class NotaFiscalService {
    NotaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    ClienteRepository: ClienteRepository = ClienteRepository.getInstance()
    VendedorRepository: VendedorRepository = VendedorRepository.getInstance()
    CarroRepository: CarroRepository = CarroRepository.getInstance()
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()

    async listaNotas(): Promise<NotaFiscal[] | number> {
        return await this.NotaFiscalRepository.listaNotas()
    }


    async listaNotaPorId(id: number) {
        if (!await this.NotaFiscalRepository.listaNotaPorId(id)) {
            throw new ErrorApp(404, "Nenhum registro encontrado");
        }
        return await this.NotaFiscalRepository.listaNotaPorId(id)
    }

    async emiteNota(notaData: NotaFiscal) {
        const dataAtual = new Date();

        if (!notaData.data_emissao || !notaData.valor_total || !notaData.id_cliente || !notaData.id_vendedor || !notaData.id_carro) {
            throw new ErrorApp(400, "Dados faltantes");
        }
        if (await this.NotaFiscalRepository.existeNumeroNota(notaData.numero_nota)) {
            throw new ErrorApp(409, "Numeração já emitida");
        }
        const dataNota = new Date(notaData.data_emissao)

        if (dataNota > dataAtual || isNaN(dataNota.getTime())) {
            throw new ErrorApp(400, "Data de emissão esta incorreta");
        }
        if (notaData.valor_total <= 0) {
            throw new ErrorApp(400, "Valor Total deve ser maior que zero");
        }

        const estoques = await this.EstoqueRepository.listaEstoquePorIdCarro(notaData.id_carro);

        if (!estoques || estoques.quantidade <= 0) {
            throw new ErrorApp(422, "Carro não esta disponivel");
        }

        if (!await this.ClienteRepository.listaClientePorId(notaData.id_cliente)) {
            throw new ErrorApp(404, "Cliente não cadastrado");
        }
        if (!await this.VendedorRepository.listaVendedorPorId(notaData.id_vendedor)) {
            throw new ErrorApp(404, "Vendedor não cadastrado");
        }
        if (!await this.EstoqueRepository.existeEstoque(notaData.id_carro)) {
            throw new ErrorApp(422, "Valor de estoque deve ser maior que zero");
        }

        estoques.quantidade --

        await this.EstoqueRepository.atualizarEstoque(estoques)

        const novaNota = new NotaFiscal(notaData.id_nota, notaData.numero_nota, notaData.data_emissao, notaData.valor_total, notaData.id_cliente, notaData.id_vendedor, notaData.id_carro)
        return await this.NotaFiscalRepository.adicionaNota(novaNota)
    }
}

