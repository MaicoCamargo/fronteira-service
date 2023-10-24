import { LoadCarroById } from '../../../domain/usecases/carro/load-carro-by-id';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';

export class DbLoadCarroById implements LoadCarroById {
    constructor(private readonly loadCarroByIdRepository: LoadCarroByIdRepository) {}

    async loadById(id: number): Promise<CarroModel> {
        const carro = await this.loadCarroByIdRepository.loadById({ id_carro: id });
        return {
            id: carro.id_carro,
            modelo: carro.modelo,
            placa: carro.placa,
            ano: carro.ano,
            cor: carro.cor,
            quilometragem: carro.quilometragem
        };
    }
}
