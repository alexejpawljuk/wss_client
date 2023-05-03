export type User_id = number
export type Firstname = string
export type Lastname = string
export type Telegram_id = string
export type Registration = Date
export type Active = boolean
export type Language = "DE" | "EN" | "RU"
export type IPhoto = string
export type IAssignment = number
export type Chat = boolean

export interface IUser {
    user_id: User_id
    firstname: Firstname,
    lastname: Lastname,
    telegram_id: Telegram_id,
    registration: Registration,
    active: Active,
    language: Language
    photo: IPhoto
    assignment: IAssignment
    chat: Chat
}


export interface IUserCreateForm {
    language: Language
    firstname: Firstname
    lastname: Lastname
    telegram_id: Telegram_id
}