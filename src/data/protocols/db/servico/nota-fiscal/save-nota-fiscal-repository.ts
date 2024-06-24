export interface SaveNotaFiscalRepository {
    save: (idServico: number) => Promise<void>;
}
