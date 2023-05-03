import {INotificationData} from "../INotificationData"
import {IUser} from "../user/IUser"
import {IAccessToken} from "../store/IAuthService"
import {AxiosError} from "axios"
import {IFetchNotificationData, INotificationHistory} from "../store/INotificationService";
import {IAssignment} from "../assignment/IAssignment";
import {IAdmin} from "../admin/IAdmin";


export interface IFetchError extends AxiosError<{notification: INotificationData}, {t: string}> {
}

export interface IFetchDefaultResponse {
    notification: INotificationData
}

export interface IFetchGetUserResponse extends IFetchDefaultResponse {
    users: IUser[]
}

export interface IFetchLoginResponse extends IFetchDefaultResponse {
    accessToken: IAccessToken
    admin: IAdmin | null
    assignment: IAssignment | null
}

export interface IFetchNotificationDataResponse extends IFetchDefaultResponse {
    data: IFetchNotificationData
    notificationHistory: INotificationHistory[]
}

export interface IFetchGetNotificationHistoryResponse extends IFetchDefaultResponse {
    notificationHistory: INotificationHistory[]
}

export interface IFetchDeleteUserResponse extends IFetchDefaultResponse {

}