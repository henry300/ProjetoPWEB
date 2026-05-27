import express, { Request, Response } from "express";
import { atualizarCarro, cadastrarCarro, deleteCarro, listaCarros, listarCarroPorId, listarCarrosDisponiveis } from "./controllers/carroController";
import { atualizarEstoque, cadastrarEstoque, deletaEstoque, listaEstoques, listarEstoquePorId, listarEstoquePorIdCarro } from "./controllers/estoqueController";

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
