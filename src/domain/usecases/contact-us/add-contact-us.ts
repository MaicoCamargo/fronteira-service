export interface AddContactUsParams {
    firstName: string;
    lastName?: string;
    contact: string;
    message: string;
}

export interface AddContactUs {
    add: (params: AddContactUsParams) => Promise<void>;
}
