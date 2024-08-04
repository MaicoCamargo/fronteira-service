export interface LoadNotaFiscalByIdServicoRepository {
    load: (idServico: number) => Promise<boolean>;
}
