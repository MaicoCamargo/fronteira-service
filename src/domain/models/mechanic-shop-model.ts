import { EnderecoModel } from '@/domain/models/endereco-model';

export interface MechanicShopModel {
    id: number;
    name: string;
    document: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    address: EnderecoModel;
    logo?: string;
}
