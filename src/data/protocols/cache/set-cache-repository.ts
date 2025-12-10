export interface SetCacheRepository {
    set: (key: string, value: any, ttl?: number) => Promise<void>;
}
