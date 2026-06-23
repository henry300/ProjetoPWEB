import express, { Request, Response, Router } from "express";

import { clienteControler } from "../controllers/clienteControler";
import { CarroController } from "../controllers/carroController";
import { EstoqueController } from "../controllers/estoqueController";
import { NotaFiscalController } from "../controllers/notaFiscalController";
import { VendedorController } from "../controllers/vendedorController";

const router = Router();
const ClienteControler = new clienteControler();
const carroController = new CarroController();
const estoqueController = new EstoqueController();
const notaFiscalController = new NotaFiscalController();
const vendedorController = new VendedorController();


// Carro
router.get("/carros",(req: Request, res: Response) => {carroController.listaCarros(req,res)});
router.get("/carros/disponiveis",(req: Request, res: Response) => {carroController.listarCarrosDisponiveis(req,res)});
router.get("/carros/:id", (req: Request, res: Response) => {carroController.listarCarroPorId(req,res)});
router.post("/carros", (req: Request, res: Response) => {carroController.cadastrarCarro(req,res)});
router.put("/carros/:id", (req: Request, res: Response) => {carroController.atualizarCarro(req, res)});
router.delete("/carros/:id", (req: Request, res: Response) => {carroController.deleteCarro(req, res)});

// Estoque
router.get("/estoque", (req: Request, res: Response) => {estoqueController.listaEstoque(req,res)});
router.get("/estoque/carro/:id_carro", (req: Request, res: Response) => {estoqueController.listarEstoquePorIdCarro(req,res)});
router.get("/estoque/:id", (req: Request, res: Response) => {estoqueController.listaEstoqueId(req,res)});
router.post("/estoque", (req: Request, res: Response) => {estoqueController.cadastraEstoque(req,res)});
router.put("/estoque/:id", (req: Request, res: Response) => {estoqueController.atualizaEstoque(req,res)});
router.delete("/estoque/:id", (req: Request, res: Response) => {estoqueController.deletaEstoque(req,res)});

// Nota fiscal
router.get("/notas", (req: Request, res: Response) => {notaFiscalController.listarNotaFiscal(req,res)});
router.get("/notas/:id", (req: Request, res: Response) => {notaFiscalController.listarNotaFiscalPorId(req,res)});
router.post("/notas", (req: Request, res: Response) => {notaFiscalController.criarNotaFiscal(req,res)});

//Vendedor
router.get("/vendedores/:id", (req: Request, res: Response) => {vendedorController.listaVendedorPorId(req,res)});
router.get("/vendedores", (req: Request, res: Response) => {vendedorController.listaVendedor(req,res)});
router.get("/vendedores/notas/:id", (req: Request, res: Response) => {vendedorController.listaNotasPorVendedor(req,res)});
router.post("/vendedores", (req: Request, res: Response) => {vendedorController.CadastraVendedor(req,res)});
router.put("/vendedores/:id", (req: Request, res: Response) => {vendedorController.AtualizaVendedor(req, res)});
router.delete("/vendedores/:id", (req: Request, res: Response) => {vendedorController.deletarVendedor(req,res)});

// Cliente
router.get("/clientes/:id",(req: Request, res: Response) => {ClienteControler.listaclientePorId(req,res);})
router.get("/clientes",(req: Request, res: Response) => {ClienteControler.listacliente(req,res);})
router.post("/clientes",(req: Request, res: Response) => {ClienteControler.Cadastracliente(req,res);})
router.put("/clientes/:id",(req: Request, res: Response) => {ClienteControler.Atualizacliente(req,res);})
router.delete("/clientes/:id",(req: Request, res: Response) => {ClienteControler.deletarcliente(req,res);})
router.get("/clientes/notas/:id",(req: Request, res: Response) => {ClienteControler.listaNotasPorCliente(req,res);})

export default router;