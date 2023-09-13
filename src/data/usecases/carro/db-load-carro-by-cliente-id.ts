import { LoadCarroByClienteId } from '../../../domain/usecases/carro/load-carro-by-cliente-id';
import { CarroModel } from '../../../domain/models/carro-model';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';

export class DbLoadCarroByClienteId implements LoadCarroByClienteId {
    constructor(private readonly loadCarroByClienteIdRepository: LoadCarroByClienteIdRepository) {}

    async loadByClienteId(id: number): Promise<CarroModel[]> {
        const models = await this.loadCarroByClienteIdRepository.loadByClienteId(id);

        return models.map((model) => ({
            cor: model.cor,
            ano: model.ano,
            quilometragem: model.kilometragem,
            modelo: model.modelo,
            placa: model.placa,
            id: model.id_carro
        }));
    }
}
