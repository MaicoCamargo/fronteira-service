export interface DbProfileModel {
    id_profile: number; // Identificador único do perfil
    username: string; // Nome de usuário, deve ser único
    firstName: string; // Primeiro nome do usuário
    lastName?: string; // Sobrenome do usuário (opcional)
    mail: string; // E-mail do usuário, deve ser único
    birthday?: Date; // Data de nascimento do usuário (opcional)
    nickname?: string; // Apelido do usuário (opcional)
    contact?: string; // Contato do usuário (opcional)
}
