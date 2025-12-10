export interface DeleteCacheRepository {
    delete: (key: string) => Promise<void>;
}
