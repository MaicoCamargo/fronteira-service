import { AddCarro, AddCarroParams } from '../../../domain/usecases/carro/add-carro';
import { CarroModel } from '../../../domain/models/carro-model';
import { AddCarroModel, SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';

export class DbAddCarro implements AddCarro {
    constructor(private readonly saveCarroRepository: SaveCarroRepository) {}

    async add(params: AddCarroParams): Promise<CarroModel> {
        const model: AddCarroModel = {
            ano: params.ano,
            cor: params.cor,
            kilometragem: params.quilometragem,
            modelo: params.modelo,
            placa: params.placa
        };
        const carro = await this.saveCarroRepository.save(model);
        return {
            id: carro.id_carro,
            ano: carro.ano,
            cor: carro.cor,
            quilometragem: carro.kilometragem,
            modelo: carro.modelo,
            placa: carro.placa
        };
    }
}
