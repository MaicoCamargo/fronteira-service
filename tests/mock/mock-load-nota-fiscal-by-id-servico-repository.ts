import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';

export const makeLoadNotaFiscalByIdServicoRepository = (): LoadNotaFiscalByIdServicoRepository => {
    class LoadNotaFiscalByIdServicoRepositoryStub implements LoadNotaFiscalByIdServicoRepository {
        async load(idServico: number): Promise<boolean> {
            return await Promise.resolve(false);
        }
    }

    return new LoadNotaFiscalByIdServicoRepositoryStub();
};
