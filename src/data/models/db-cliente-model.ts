export interface DbClienteModel {
    id_cliente?: number;
    nome: string;
    telefone: string;
    cpf: string;
    carro_id: number;
    endereco_id: number;
    last_updated?: Date;
}
