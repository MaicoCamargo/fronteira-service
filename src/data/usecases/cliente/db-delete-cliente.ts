import { DeleteCliente } from '@/domain/usecases/cliente/delete-cliente';
import { DeleteClienteRepository } from '../../protocols/db/cliente/delete-cliente-repository';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';
import { DeleteCarroRepository } from '../../protocols/db/carro/delete-carro-repository';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbDeleteCliente implements DeleteCliente {
    private readonly LIST_CACHE_KEY: string = 'customers::list';
    constructor(
        private readonly deleteClienteRepository: DeleteClienteRepository,
        private readonly loadCarroByClienteIdRepository: LoadCarroByClienteIdRepository,
        private readonly deleteCarroRepository: DeleteCarroRepository,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async delete(id: number): Promise<void> {
        const carros = await this.loadCarroByClienteIdRepository.loadByClienteId(id);
        const promises = [];
        carros.forEach((carro) => promises.push(this.deleteCarroRepository.delete(carro.id_carro)));
        await Promise.all(promises);
        await this.deleteClienteRepository.delete(id);
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
    }
}
