export interface DbMechanicShopModel {
    id_mechanic_shop: number;
    name: string;
    document: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
    dh_exclusion?: Date;
    endereco_id?: number;
    logo?: string;
}
