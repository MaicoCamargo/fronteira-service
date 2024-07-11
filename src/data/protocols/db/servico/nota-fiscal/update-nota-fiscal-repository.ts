export interface UpdateNotaFiscalRepository {
    update: (idServico: number, status: boolean) => Promise<boolean>;
}
