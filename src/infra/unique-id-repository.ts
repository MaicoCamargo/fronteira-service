export const UniqueIdRepository = {
    AVAILABLE_CARACTERES: 'ABCDEFGHJKMNPQRSTUVWXYZ23456789',
    generate(size: number, prefix?: string): string {
        if (prefix) {
            size = size - 1;
        }
        const charactersLength = this.AVAILABLE_CARACTERES.length;
        const randoms: string[] = [];
        for (let i = 0; i < size; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            randoms.push(this.AVAILABLE_CARACTERES.charAt(randomIndex));
        }
        return prefix + randoms.join('');
    }
};
