export interface DbItemModel {
    id_peca: number;
    nome: string;
    marca: string;
    valor: number;
    created_at?: Date;
    updated_at?: Date;
    dh_exclusion?: Date;
}
