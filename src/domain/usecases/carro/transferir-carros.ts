import { CarroModel } from '../../models/carro-model';
import { UpdateClienteParams } from '@/domain/usecases/cliente/update-cliente';
import { UpdateCarroParams } from '@/domain/usecases/carro/update-carro';

type CarWithId = Omit<UpdateCarroParams, 'id'> & { id: number };

export type TransferirCarrosParams = Required<UpdateClienteParams> & { carros: CarWithId[] };

export interface TransferirCarros {
    transfer: (params: TransferirCarrosParams) => Promise<CarroModel[]>;
}
