import { AddCarro, AddCarroParams } from '../../../domain/usecases/carro/add-carro';
import { CarroModel } from '../../../domain/models/carro-model';
import { SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';

export class DbAddCarro implements AddCarro {
    constructor(private readonly saveCarroRepository: SaveCarroRepository) {}

    async add(params: AddCarroParams): Promise<CarroModel> {
        const carro = await this.saveCarroRepository.save(params);
        return {
            id: carro.id_carro,
            ano: carro.ano,
            cor: carro.cor,
            quilometragem: carro.quilometragem,
            modelo: carro.modelo,
            placa: carro.placa
        };
    }
}
