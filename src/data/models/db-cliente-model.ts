export interface DbClienteModel {
    id_cliente?: number;
    nome: string;
    telefone: string;
    cpf: string;
    endereco_id?: number;
    last_updated?: Date;
}
