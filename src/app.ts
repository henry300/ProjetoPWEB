import express, { Request, Response } from "express";
import { atualizarCarro, cadastrarCarro, deleteCarro, listaCarros, listarCarroPorId, listarCarrosDisponiveis } from "./controllers/carroController";
import { atualizarEstoque, cadastrarEstoque, deletaEstoque, listaEstoques, listarEstoquePorId, listarEstoquePorIdCarro } from "./controllers/estoqueController";
import { criarNotaFiscal, listarNotaFiscal, listarNotaFiscalPorId } from "./controllers/notaFiscalController";
import { AtualizaVendedor, CadastraVendedor, deletarVendedor, listaNotasPorVendedor, listaVendedor, listaVendedorPorId } from "./controllers/vendedorController";
import { Atualizacliente, Cadastracliente, deletarcliente, listacliente, listaclientePorId, listaNotasPorCliente } from "./controllers/clienteControler";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));

// Carro
app.get("/carros",listaCarros)
app.get("/carros/disponiveis",listarCarrosDisponiveis)
app.get("/carros/:id",listarCarroPorId)
app.post("/carros",cadastrarCarro)
app.put("/carros/:id",atualizarCarro)
app.delete("/carros/:id",deleteCarro)

// Estoque
app.get("/estoque",listaEstoques)
app.get("/estoque/carro/:id_carro",listarEstoquePorIdCarro)
app.get("/estoque/:id",listarEstoquePorId)
app.post("/estoque",cadastrarEstoque)
app.put("/estoque/:id",atualizarEstoque)
app.delete("/estoque/:id",deletaEstoque)

// Nota fiscal
app.get("/notas/",listarNotaFiscal)
app.get("/notas/:id",listarNotaFiscalPorId)
app.post("/notas",criarNotaFiscal)

//Vendedor
app.get("/vendedores",listaVendedor)
app.get("/vendedores/:id",listaVendedorPorId)
app.post("/vendedores",CadastraVendedor)
app.put("/vendedores/:id",AtualizaVendedor)
app.delete("/vendedores/:id",deletarVendedor)
app.get("/vendedores/notas-fiscais/:id", listaNotasPorVendedor)

//app.get("/vendedores",listaVendedor)
app.get("/clientes/:id",listaclientePorId)
app.get("/clientes",listacliente)
app.post("/clientes",Cadastracliente)
app.put("/clientes/:id",Atualizacliente)
app.delete("/clientes/:id",deletarcliente)
app.get("/clientes/notas-fiscais/:id",listaNotasPorCliente)