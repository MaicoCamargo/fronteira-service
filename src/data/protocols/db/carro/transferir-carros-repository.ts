import { DbCarroModel } from '@/data/models/db-carro-model';

export interface TransferirCarrosModel {
    id: number;
}

export interface TransferirCarrosRepository {
    transferir: (carros: TransferirCarrosModel[], clienteId: number) => Promise<DbCarroModel[]>;
}
