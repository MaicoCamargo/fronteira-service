export interface ScanAndDeleteCacheRepository {
    scanAndDelete: (key: string) => Promise<void>;
}
