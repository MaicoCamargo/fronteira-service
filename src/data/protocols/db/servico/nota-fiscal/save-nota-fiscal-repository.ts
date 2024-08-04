export interface SaveNotaFiscalRepository {
    save: (idServico: number, status: boolean) => Promise<void>;
}
