export interface ProfileModel {
    id?: number;
    username: string;
    firstName: string;
    lastName?: string;
    mail: string;
    birthday?: Date;
    nickname?: string;
    contacts?: string[];
    positions: string[];
    createdAt?: Date;
}
