# Projeto I Programação para Web
Objetivo Desenvolver uma API REST para gestão de uma concessionária de veículos com arquitetura MVC.

O sistema deve permitir o gerenciamento completo do cadastro de clientes, vendedores e carros, o controle de estoque e a emissão de notas fiscais de venda, seguindo rigorosamente as regras de negócio estabelecidas.

## Funções
- [ ] Cadastro de Clientes
- [ ] Cadastro de Carros
- [ ] Controle de Estoque
- [ ] Emissão de Nota Fiscal
- [ ] Consultas e Listagens

## Rotas esperadas
### clientes
- [ ] GET /clientes `Lista todos os clientes cadastrados`
- [ ] GET /clientes/:id `Retorna os dados de um cliente pelo id`.
- [ ] POST /clientes `Cadastra um novo cliente`
- [ ] PUT /clientes/:id `Atualiza os dados de um cliente existente`
- [ ] DELETE /clientes/:id `Remove um cliente (somente se não possuir notas fiscais)`
- [ ] GET /clientes/notas/:id `Lista todas as notas fiscais de um cliente`
### Vendedores
- [ ] GET     /vendedores `Lista todos os vendedores`
- [ ] GET     /vendedores/:id `Retorna um vendedor pelo id`
- [ ] POST    /vendedores `Cadastra um novo vendedor`
- [ ] PUT     /vendedores/:id `Atualiza um vendedor existente`
- [ ] DELETE  /vendedores/:id `Remove um vendedor (sem notas vinculadas)`
- [ ] GET     /vendedores/notas/:id `Lista todas as notas fiscais de um vendedor`
### Carros
- [ ] GET /carros `Lista todos os carros`
- [ ] GET /carros/:id `Retorna um carro pelo id`
- [ ] GET /carros/disponiveis `Lista carros com estoque > 0`
- [ ] POST /carros `Cadastra um novo carro`
- [ ] PUT /carros/:id `Atualiza um carro existente`
- [ ] DELETE /carros/:id `Remove um carro (sem estoque ou notas)`
### Estoque
- [ ] GET /estoque `Lista todos os registros de estoque`
- [ ] GET /estoque/:id `Retorna um registro de estoque pelo id`
- [ ] GET /estoque/carro/:id_carro `Retorna o estoque de um carro específico`
- [ ] POST /estoque `Cria um novo registro de estoque`
- [ ] PUT /estoque/:id `Atualiza quantidade ou localização`
- [ ] DELETE /estoque/:id `Remove um registro de estoque`

### Notas
- [ ] GET /notas `Lista todas as notas fiscais`
- [ ] GET /notas/:id `Retorna uma nota fiscal pelo id`
- [ ] POST /notas `Emite uma nova nota fiscal (decrementa estoque)`




## Tipos de Commits
- 🟢 **Feat:** Adicionando um novo recurso ao projeto.
- 🔴 **Fix:** Corrigindo um erro ou bug.
- 🔵 **Docs:** Alterando apenas a documentação.
- 🟡 **refactor:** Refatorando o código.
- 🟣 **style:** Alterando a formatação.
