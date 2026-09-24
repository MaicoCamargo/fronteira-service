export interface RequestScopeData {
    authorization?: string;
    clientId?: string;
}

export interface RequestScopeRepository {
    getStore: () => RequestScopeData | undefined;
    enterWith: (data: RequestScopeData) => void;
}
