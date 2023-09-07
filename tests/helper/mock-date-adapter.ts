import * as mockdate from "mockdate";

export const mockDateAdapter = {
    set(date: Date): void {
        mockdate.set(date);
    },
    reset(): void {
        mockdate.reset();
    }
}
