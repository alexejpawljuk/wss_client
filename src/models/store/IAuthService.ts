import {INotificationData} from "../INotificationData"
import {IAdmin} from "../admin/IAdmin"
import {IAssignment} from "../assignment/IAssignment"

export type IAccessToken = string | null

export interface IAuthService {
    accessToken: IAccessToken
    assignment: IAssignment | null
    admin: IAdmin | null
    isLoading: boolean
    notification: INotificationData
    fetchAuth(login: string, password: string): Promise<void>
    logout(): void
}