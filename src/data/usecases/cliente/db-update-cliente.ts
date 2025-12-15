import { UpdateCliente, UpdateClienteParams } from '@/domain/usecases/cliente/update-cliente';
import { ClienteModel } from '@/domain/models/cliente-model';
import { UpdateClienteRepository } from '@/data/protocols/db/cliente/update-cliente-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { UpdateCarroRepository } from '@/data/protocols/db/carro/update-carro-repository';
import { CarroModel } from '@/domain/models/carro-model';
import { SaveCarroRepository } from '@/data/protocols/db/carro/save-carro-repository';
import { UpdateCarroParams } from '@/domain/usecases/carro/update-carro';
import { LoadCarroByClienteIdRepository } from '@/data/protocols/db/carro/load-carro-by-cliente-id-repository';
import { DeleteCarroRepository } from '@/data/protocols/db/carro/delete-carro-repository';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbUpdateCliente implements UpdateCliente {
    private readonly LIST_CACHE_KEY: string = 'customers::list';
    constructor(
        private readonly updateClienteRepository: UpdateClienteRepository,
        private readonly updateCarroRepository: UpdateCarroRepository,
        private readonly saveCarroRepository: SaveCarroRepository,
        private readonly loadCarroByClienteIdRepository: LoadCarroByClienteIdRepository,
        private readonly deleteCarroRepository: DeleteCarroRepository,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async update(model: UpdateClienteParams): Promise<Wrapper<ClienteModel>> {
        const updated = await this.updateClienteRepository.update({
            id_cliente: model.id,
            nome: model.nome,
            cpf: model.cpf,
            telefone: model.telefone
        });
        const cliente: ClienteModel = {
            id: updated.id_cliente,
            cpf: updated.cpf,
            telefone: updated.telefone,
            nome: updated.nome,
            carros: await this.updateCarros(model.carros, updated.id_cliente)
        };
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
        return { content: cliente };
    }

    async updateCarros(models: UpdateCarroParams[], clienteId: number): Promise<CarroModel[]> {
        const currentCarros = await this.loadCarroByClienteIdRepository.loadByClienteId(clienteId);
        for (const carro of currentCarros) {
            if (!models.find((find) => find.id === carro.id_carro)) {
                await this.deleteCarroRepository.delete(carro.id_carro);
            }
        }
        const carroModels: CarroModel[] = [];
        if (!models || models.length === 0) return carroModels;
        for (const carro of models) {
            if (carro.id) {
                const result = await this.updateCarroRepository.update({
                    id_carro: carro.id,
                    cor: carro.cor,
                    ano: carro.ano,
                    modelo: carro.modelo,
                    placa: carro.placa,
                    quilometragem: carro.quilometragem
                });
                carroModels.push({
                    cor: result.cor,
                    ano: result.ano,
                    modelo: result.modelo,
                    placa: result.placa,
                    quilometragem: result.quilometragem,
                    id: result.id_carro
                });
            } else {
                const result = await this.saveCarroRepository.save(
                    {
                        cor: carro.cor,
                        ano: carro.ano,
                        modelo: carro.modelo,
                        placa: carro.placa,
                        quilometragem: carro.quilometragem
                    },
                    clienteId
                );
                carroModels.push({
                    cor: result.cor,
                    ano: result.ano,
                    modelo: result.modelo,
                    placa: result.placa,
                    quilometragem: result.quilometragem,
                    id: result.id_carro
                });
            }
        }

        return carroModels;
    }
}
