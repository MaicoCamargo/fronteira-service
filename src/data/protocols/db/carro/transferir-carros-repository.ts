import { UpdateCarroModel } from '@/data/protocols/db/carro/update-carro-repository';
import { DbCarroModel } from '@/data/models/db-carro-model';

export interface TransferirCarrosRepository {
    transferir: (carros: UpdateCarroModel[], clienteId: number) => Promise<DbCarroModel[]>;
}
