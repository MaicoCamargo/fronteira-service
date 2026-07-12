import { TransferirCarros, TransferirCarrosParams } from '@/domain/usecases/carro/transferir-carros';
import { CarroModel } from '@/domain/models/carro-model';
import { TransferirCarrosRepository } from '@/data/protocols/db/carro/transferir-carros-repository';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbTransferirCarros implements TransferirCarros {
    private readonly LIST_CACHE_KEY: string = 'customers::list';
    constructor(
        private readonly transferirCarrosRepository: TransferirCarrosRepository,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async transfer(params: TransferirCarrosParams): Promise<CarroModel[]> {
        const carros = params.carros.map((carro) => ({ id: carro.id }));
        const dbCarroModels = await this.transferirCarrosRepository.transferir(carros, params.id);
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
        return dbCarroModels.map((carro) => ({ ...carro, id: carro.id_carro }));
    }
}
