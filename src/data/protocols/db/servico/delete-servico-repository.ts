export interface DeleteServicoRepository {
    delete: (id: number) => Promise<void>;
}
