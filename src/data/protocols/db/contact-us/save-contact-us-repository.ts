export interface AddContactUsModel {
    firstName: string;
    lastName?: string;
    contact: string;
    message: string;
}

export interface SaveContactUsRepository {
    save: (contactUs: AddContactUsModel) => Promise<void>;
}
