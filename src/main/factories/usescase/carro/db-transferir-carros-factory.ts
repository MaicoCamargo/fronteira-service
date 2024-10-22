import { DbTransferirCarros } from '@/data/usecases/carro/db-transferir-carros';
import { CarroPgRepository } from '@/infra/db/pg/carro-pg-repository';

export const makeDbTransferirCarrosFactory = (): DbTransferirCarros => {
    const carroPgRepository = new CarroPgRepository();
    return new DbTransferirCarros(carroPgRepository);
};
