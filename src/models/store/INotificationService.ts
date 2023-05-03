import {IAccessToken} from "./IAuthService"
import {IUser} from "../user/IUser"
import {INotificationData} from "../INotificationData"
import {IAdmin} from "../admin/IAdmin";

export interface INotificationHistory {
    notification_id: string
    date: Date
    from_admin_id: string
    to_telegram_id: string
    message: string
}

export interface IFetchNotificationData {
    notification_text: string
}

export interface INotificationService {
    data: IFetchNotificationData
    notificationHistory: INotificationHistory[]
    isLoading: boolean
    notification: INotificationData
    dataToDefaultState(): void
    fetchGetDefaultData(accessToken: IAccessToken): Promise<void>
    fetchSetNotificationText(accessToken: IAccessToken, text: string): Promise<void>
    fetchSendNotification(user: IUser, admin: IAdmin, message: string, accessToken: IAccessToken): Promise<void>
    // fetchGetAllNotificationHistory(accessToken: IAccessToken): Promise<void>
    fetchGetNotificationHistory(user: IUser, accessToken: IAccessToken): Promise<INotificationHistory[]>
}