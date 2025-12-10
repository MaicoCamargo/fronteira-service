export interface GetCacheRepository {
    get: <T = any>(key: string) => Promise<T | null>;
}
