import express, { Request, Response } from "express";
import { atualizarCarro, cadastrarCarro, deleteCarro, listaCarros, listarCarroPorId, listarCarrosDisponiveis } from "./controllers/carroController";
import { atualizarEstoque, cadastrarEstoque, deletaEstoque, listaEstoques, listarEstoquePorId, listarEstoquePorIdCarro } from "./controllers/estoqueController";
import { criarNotaFiscal, listarNotaFiscal } from "./controllers/notaFiscalController";
import { AtualizaVendedor, CadastraVendedor, deletarVendedor, listaNotasPorVendedor, listaVendedor, listaVendedorPorId } from "./controllers/vendedorController";

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
app.get("/notas/:id",listarCarroPorId)
app.post("/notas",criarNotaFiscal)

//Vendedor
app.get("/vendedores",listaVendedor)
app.get("/vendedores/:id",listaVendedorPorId)
app.post("/vendedores",CadastraVendedor)
app.put("/vendedores/:id",AtualizaVendedor)
app.delete("/vendedores/:id",deletarVendedor)
app.get("/vendedores", listaNotasPorVendedor)