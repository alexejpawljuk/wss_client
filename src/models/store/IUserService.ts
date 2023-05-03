import {IUser, IUserCreateForm, Telegram_id, User_id} from "../user/IUser"
import {IAccessToken} from "./IAuthService"
import {INotificationData} from "../INotificationData"

export type SortSelector = "firstname" | "lastname"

export interface IUserService {
    users: IUser[]
    userList: IUser[]
    selectedUser: IUser | null
    isLoading: boolean
    notification: INotificationData
    fetchGetUser(accessToken: IAccessToken): Promise<void>
    fetchUserDelete(accessToken: IAccessToken, telegram_id: Telegram_id): Promise<void>
    fetchUserDestroy(accessToken: IAccessToken, telegram_id: Telegram_id): Promise<void>
    fetchUserRestore(accessToken: IAccessToken, telegram_id: Telegram_id): Promise<void>
    fetchUserEdit(accessToken: IAccessToken, userData: { user_id: User_id, formData:IUserCreateForm } ): Promise<void>
    fetchUserCreate(accessToken: IAccessToken, userData: IUserCreateForm): Promise<void>
    setUserList(list: IUser[]): void
    setSelectedUser(user: IUser | null): void
    setIsLoading(isLoading: boolean): void
}