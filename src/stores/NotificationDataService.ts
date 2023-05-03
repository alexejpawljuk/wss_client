import {create} from "zustand"
import {INotificationHistory, INotificationService} from "../models/store/INotificationService"
import {fetch} from "../util/Fetch"
import {IAccessToken} from "../models/store/IAuthService"
import {IFetchError, IFetchGetNotificationHistoryResponse, IFetchNotificationDataResponse} from "../models/util/IFetch"
import {IUser} from "../models/user/IUser"
import {INotificationData} from "../models/INotificationData"
import {isAxiosError} from "axios"
import {IAdmin} from "../models/admin/IAdmin"
import {devtools} from "zustand/middleware";

export const useNotificationDataService = create<INotificationService>()(devtools(setState => ({
    data: {
        notification_text: ""
    },
    notificationHistory: [],
    isLoading: false,
    notification: {} as INotificationData,

    dataToDefaultState(): void {
        setState(state => ({...state, notificationHistory: []}))
    },

    async fetchGetDefaultData(accessToken: IAccessToken): Promise<void> {
        try {
            setState(state => ({...state, isLoading: true}))
            const response = await fetch.get<IFetchNotificationDataResponse>("/api/app/notification/data", {headers: {authorization: accessToken}})

            setState(state => ({...state, data: response.data.data, isLoading: false, notification: response.data.notification}))
            return Promise.resolve()
        } catch (e: any) {
            setState(state => ({...state, isLoading: false}))

            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    async fetchSetNotificationText(accessToken: IAccessToken, text: string): Promise<void> {
        try {
            setState(state => ({...state, isLoading: true}))
            const response = await fetch.put<IFetchNotificationDataResponse>("/api/app/notification/data", {data: {text}}, {headers: {authorization: accessToken}})

            setState(state => ({
                ...state,
                data: response.data.data,
                isLoading: false,
                notification: response.data.notification
            }))
            return Promise.resolve()
        } catch (e: any) {
            setState(state => ({...state, isLoading: false}))

            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    async fetchSendNotification(user: IUser, admin: IAdmin, message: string, accessToken: IAccessToken): Promise<void> {
        try {
            setState(state => ({...state, isLoading: true}))
            const response = await fetch.post<IFetchNotificationDataResponse>("/api/notification/send", {
                user,
                admin,
                message: {text: message}
            }, {headers: {authorization: accessToken}})


            setState(state => ({
                ...state,
                isLoading: false,
                notification: response.data.notification,
                notificationHistory: response.data.notificationHistory
            }))
            return Promise.resolve()
        } catch (e: any) {
            setState(state => ({...state, isLoading: false}))

            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    // async fetchGetAllNotificationHistory(accessToken: IAccessToken): Promise<void> {
    //         try {
    //             setState(state => ({...state, isLoading: true}))
    //             const response = await fetch.get<IFetchGetNotificationHistoryResponse>("/api/notification/history", {headers: {authorization: accessToken}})
    //
    //             setState(state => ({...state, isLoading: false, notificationHistory: response.data.notificationHistory}))
    //             return Promise.resolve()
    //         } catch (e: any) {
    //             setState(state => ({...state, isLoading: false}))
    //
    //             if (!isAxiosError(e)) return Promise.reject(e.message)
    //             setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
    //             return Promise.reject(e.message)
    //         }
    // }
    async fetchGetNotificationHistory(user: IUser, accessToken: IAccessToken): Promise<INotificationHistory[]> {
        try {
            setState(state => ({...state, isLoading: true}))
            const response = await fetch.get<IFetchGetNotificationHistoryResponse>("/api/notification/history", {params: {user_telegram_id: user.telegram_id}, headers: {authorization: accessToken}})

            setState(state => ({...state, isLoading: false, notificationHistory: response.data.notificationHistory}))
            return Promise.resolve(response.data.notificationHistory)
        } catch (e: any) {
            setState(state => ({...state, isLoading: false}))

            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    }
})))