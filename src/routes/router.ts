import express, { Request, Response, Router } from "express";
import { atualizarCarro, cadastrarCarro, deleteCarro, listaCarros, listarCarroPorId, listarCarrosDisponiveis } from "../controllers/carroController";
import { atualizarEstoque, cadastrarEstoque, deletaEstoque, listaEstoques, listarEstoquePorId, listarEstoquePorIdCarro } from "../controllers/estoqueController";
import { criarNotaFiscal, listarNotaFiscal, listarNotaFiscalPorId } from "../controllers/notaFiscalController";
import { AtualizaVendedor, CadastraVendedor, deletarVendedor, listaNotasPorVendedor, listaVendedor, listaVendedorPorId } from "../controllers/vendedorController";
import { Atualizacliente, Cadastracliente, deletarcliente, listacliente, listaclientePorId, listaNotasPorCliente } from "../controllers/clienteControler";

const router = Router();

// Carro
router.get("/carros",listaCarros)
router.get("/carros/disponiveis",listarCarrosDisponiveis)
router.get("/carros/:id",listarCarroPorId)
router.post("/carros",cadastrarCarro)
router.put("/carros/:id",atualizarCarro)
router.delete("/carros/:id",deleteCarro)

// Estoque
router.get("/estoque",listaEstoques)
router.get("/estoque/carro/:id_carro",listarEstoquePorIdCarro)
router.get("/estoque/:id",listarEstoquePorId)
router.post("/estoque",cadastrarEstoque)
router.put("/estoque/:id",atualizarEstoque)
router.delete("/estoque/:id",deletaEstoque)

// Nota fiscal
router.get("/notas/",listarNotaFiscal)
router.get("/notas/:id",listarNotaFiscalPorId)
router.post("/notas",criarNotaFiscal)

//Vendedor
router.get("/vendedores",listaVendedor)
router.get("/vendedores/:id",listaVendedorPorId)
router.post("/vendedores",CadastraVendedor)
router.put("/vendedores/:id",AtualizaVendedor)
router.delete("/vendedores/:id",deletarVendedor)
router.get("/vendedores/notas/:id", listaNotasPorVendedor)

//router.get("/vendedores",listaVendedor)
router.get("/clientes/:id",listaclientePorId)
router.get("/clientes",listacliente)
router.post("/clientes",Cadastracliente)
router.put("/clientes/:id",Atualizacliente)
router.delete("/clientes/:id",deletarcliente)
router.get("/clientes/notas/:id",listaNotasPorCliente)

export default router;