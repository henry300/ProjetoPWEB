# Projeto I Programação para Web
Objetivo Desenvolver uma API REST para gestão de uma concessionária de veículos com arquitetura MVC.

O sistema deve permitir o gerenciamento completo do cadastro de clientes, vendedores e carros, o controle de estoque e a emissão de notas fiscais de venda, seguindo rigorosamente as regras de negócio estabelecidas.

## Funções
- [ ] Cadastro de Clientes
- [ ] Cadastro de Carros
- [ ] Cadastro de Vendedores
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
- [X] GET     /vendedores `Lista todos os vendedores`
- [X] GET     /vendedores/:id `Retorna um vendedor pelo id`
- [X] POST    /vendedores `Cadastra um novo vendedor`
- [X] PUT     /vendedores/:id `Atualiza um vendedor existente`
- [X] DELETE  /vendedores/:id `Remove um vendedor (sem notas vinculadas)`
- [X] GET     /vendedores/notas/:id `Lista todas as notas fiscais de um vendedor`
### Carros
- [x] GET /carros `Lista todos os carros`
- [x] GET /carros/:id `Retorna um carro pelo id`
- [x] GET /carros/disponiveis `Lista carros com estoque > 0`
- [x] POST /carros `Cadastra um novo carro`
- [x] PUT /carros/:id `Atualiza um carro existente`
- [ ] DELETE /carros/:id `Remove um carro (sem estoque ou notas)`
### Estoque
- [x] GET /estoque `Lista todos os registros de estoque`
- [x] GET /estoque/:id `Retorna um registro de estoque pelo id`
- [x] GET /estoque/carro/:id_carro `Retorna o estoque de um carro específico`
- [x] POST /estoque `Cria um novo registro de estoque`
- [x] PUT /estoque/:id `Atualiza quantidade ou localização`
- [x] DELETE /estoque/:id `Remove um registro de estoque`

### Notas
- [x] GET /notas `Lista todas as notas fiscais`
- [x] GET /notas/:id `Retorna uma nota fiscal pelo id`
- [x] POST /notas `Emite uma nova nota fiscal (decrementa estoque)`




## Tipos de Commits
- 🟢 **Feat:** Adicionando um novo recurso ao projeto.
- 🔴 **Fix:** Corrigindo um erro ou bug.
- 🔵 **Docs:** Alterando apenas a documentação.
- 🟡 **refactor:** Refatorando o código.
- 🟣 **style:** Alterando a formatação.
