export interface DeleteClienteRepository {
    delete: (id: number) => Promise<void>;
}
