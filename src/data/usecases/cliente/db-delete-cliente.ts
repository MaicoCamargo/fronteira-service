import { DeleteCliente } from '../../../domain/usecases/cliente/delete-cliente';
import { DeleteClienteRepository } from '../../protocols/db/cliente/delete-cliente-repository';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';
import { DeleteCarroRepository } from '../../protocols/db/carro/delete-carro-repository';

export class DbDeleteCliente implements DeleteCliente {
    constructor(
        private readonly deleteClienteRepository: DeleteClienteRepository,
        private readonly loadCarroByClienteIdRepository: LoadCarroByClienteIdRepository,
        private readonly deleteCarroRepository: DeleteCarroRepository
    ) {}

    async delete(id: number): Promise<void> {
        const carros = await this.loadCarroByClienteIdRepository.loadByClienteId(id);
        const promises = [];
        carros.forEach((carro) => promises.push(this.deleteCarroRepository.delete(carro.id_carro)));
        await Promise.all(promises);
        await this.deleteClienteRepository.delete(id);
    }
}
