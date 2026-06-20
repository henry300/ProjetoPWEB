export class Cliente {
    constructor(
        public id_cliente: number, 
        public nome: string,
        public telefone: string, 
        public cpf: string, 
        public email: string, 
        public cidade: string) {}
}