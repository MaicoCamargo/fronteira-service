import { LoadCarroById } from '../../../domain/usecases/carro/load-carro-by-id';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';

export class DbLoadCarroById implements LoadCarroById {
    constructor(private readonly loadCarroByIdRepository: LoadCarroByIdRepository) {}

    async loadById(id: number): Promise<CarroModel> {
        await this.loadCarroByIdRepository.loadById(id);
        return await Promise.resolve(undefined);
    }
}
