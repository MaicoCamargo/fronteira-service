export interface DbIncludedItemModel {
    id_servico_peca: number;
    quantidade: number;
    valor_por_unidade: number;
    created_at?: Date;
    last_updated?: Date;
    nome: string;
    marca: string;
    valor_total: number;
    servico_id: number;
    peca_id: number;
}
