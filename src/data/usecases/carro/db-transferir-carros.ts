import { TransferirCarros, TransferirCarrosParams } from '@/domain/usecases/carro/transferir-carros';
import { CarroModel } from '@/domain/models/carro-model';
import { TransferirCarrosRepository } from '@/data/protocols/db/carro/transferir-carros-repository';

export class DbTransferirCarros implements TransferirCarros {
    constructor(private readonly transferirCarrosRepository: TransferirCarrosRepository) {}

    async transfer(params: TransferirCarrosParams): Promise<CarroModel[]> {
        const carros = params.carros.map((carro) => ({ id: carro.id }));
        const dbCarroModels = await this.transferirCarrosRepository.transferir(carros, params.id);

        return dbCarroModels.map((carro) => ({ ...carro, id: carro.id_carro }));
    }
}
