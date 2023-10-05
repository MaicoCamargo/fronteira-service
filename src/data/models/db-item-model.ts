export interface DbItemModel {
    id_peca: number;
    nome: string;
    marca: string;
    valor: number;
    created_at?: Date;
    last_updated?: Date;
    dh_exclusion?: Date;
}
