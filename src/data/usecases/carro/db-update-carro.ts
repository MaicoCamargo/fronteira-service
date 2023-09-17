import { UpdateCarro, UpdateCarroParams } from '../../../domain/usecases/carro/update-carro';
import { CarroModel } from '../../../domain/models/carro-model';
import { UpdateCarroModel, UpdateCarroRepository } from '../../protocols/db/carro/update-carro-repository';

export class DbUpdateCarro implements UpdateCarro {
    constructor(private readonly updateCarroRepository: UpdateCarroRepository) {}
    async update(params: UpdateCarroParams): Promise<CarroModel> {
        const model: UpdateCarroModel = {
            ano: params.ano,
            cor: params.cor,
            quilometragem: params.quilometragem,
            modelo: params.modelo,
            placa: params.placa,
            id_carro: params.id
        };
        await this.updateCarroRepository.update(model);
        return await Promise.resolve(undefined);
    }
}
