export interface DbServicoModel {
    id_servico: number;
    descricao?: string;
    valor: number;
    data: Date;
    carro_id: number;
    quilometragem?: number;
    last_updated?: Date;
}
