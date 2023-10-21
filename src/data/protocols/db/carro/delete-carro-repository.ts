export interface DeleteCarroRepository {
    delete: (id: number) => Promise<void>;
}
