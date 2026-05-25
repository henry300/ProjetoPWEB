import express, { Request, Response } from "express";
import { atualizarCarro, cadastrarCarro, deleteCarro, listaCarros, listarCarroPorId, listarCarrosDisponiveis } from "./controllers/carroController";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));

app.get("/carros",listaCarros)
app.get("/carros/disponiveis",listarCarrosDisponiveis)
app.get("/carros/:id",listarCarroPorId)
app.post("/carros",cadastrarCarro)
app.put("/carros/:id",atualizarCarro)
app.delete("/carros/:id",deleteCarro)