import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

import { ClienteRepository } from '../repositories/clienteRepository';
import { VendedorRepository } from '../repositories/VendedorRepository';
import { CarroRepository } from '../repositories/CarroRepository';
import { EstoqueRepository } from '../repositories/EstoqueRepository';
import { NotaFiscalRepository } from '../repositories/NotaFiscalRepository';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME || 'PROJETOPWEB'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL');
});

export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}

export async function inicializarBanco(): Promise<void> {
    console.log('Sincronizando schemas do banco de dados...');

    const schemas = [
        `DROP TABLE IF EXISTS notafiscal`,
        `DROP TABLE IF EXISTS estoque`,
        `DROP TABLE IF EXISTS carro`,
        `DROP TABLE IF EXISTS cliente`,
        `DROP TABLE IF EXISTS vendedor`,
        ClienteRepository.getCreateTableQuery(),
        VendedorRepository.getCreateTableQuery(),
        CarroRepository.getCreateTableQuery(),
        EstoqueRepository.getCreateTableQuery(),
        NotaFiscalRepository.getCreateTableQuery()
    ];

    try {

        await executarComandoSQL(`USE ${dbConfig.database}`, []);
        console.log(`Conectado ao schema: ${dbConfig.database}`);

        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log('Todos os repositórios foram inicializados com sucesso.');
    } catch (err) {
        console.error('Erro crítico na sincronização dos repositórios:', err);
        process.exit(1);
    }
}