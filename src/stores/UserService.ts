import {create} from "zustand"
import {IUserService} from "../models/store/IUserService"
import {fetch} from "../util/Fetch"
import {IFetchDeleteUserResponse, IFetchError, IFetchGetUserResponse} from "../models/util/IFetch"
import {IAccessToken} from "../models/store/IAuthService"
import {isAxiosError} from "axios"
import {INotificationData} from "../models/INotificationData"
import {IUser, IUserCreateForm, Telegram_id} from "../models/user/IUser"
import {devtools} from "zustand/middleware"


export const useUserService = create<IUserService>()(devtools(setState => ({
    users: [],
    userList: [],
    selectedUser: null,
    isLoading: false,
    notification: {} as INotificationData,

    async fetchGetUser(accessToken: IAccessToken): Promise<void> {
        try {
            setState(state => ({...state, isLoading: true}))

            const response = await fetch.get<IFetchGetUserResponse>("/api/user", {headers: {authorization: accessToken}})
            setState(state => ({...state, isLoading: false, users: response.data.users, userList: response.data.users}))

            return Promise.resolve()
        } catch (e: any) {
            setState(state => ({...state, isLoading: false}))
            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    async fetchUserDelete(accessToken: IAccessToken, telegram_id: Telegram_id): Promise<void> {
        try {
            await fetch.delete<IFetchDeleteUserResponse>("/api/user/delete", {
                headers: {authorization: accessToken},
                params: {user_telegram_id: telegram_id}
            })
            await this.fetchGetUser(accessToken)
            return Promise.resolve()
        } catch (e: any) {
            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    async fetchUserDestroy(accessToken: IAccessToken, telegram_id: Telegram_id): Promise<void> {
        try {
            await fetch.delete<IFetchDeleteUserResponse>("/api/user/destroy", {
                headers: {authorization: accessToken},
                params: {user_telegram_id: telegram_id}
            })
            await this.fetchGetUser(accessToken)
            return Promise.resolve()
        } catch (e: any) {
            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    async fetchUserRestore(accessToken: IAccessToken, telegram_id: Telegram_id): Promise<void> {
        try {
            await fetch.post<IFetchDeleteUserResponse>("/api/user/restore", {user_telegram_id: telegram_id}, {headers: {authorization: accessToken}})
            await this.fetchGetUser(accessToken)
            return Promise.resolve()
        } catch (e: any) {
            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    async fetchUserEdit(accessToken, userData): Promise<void> {
        try {
            await fetch.post<IFetchDeleteUserResponse>("/api/user/edit", userData, {headers: {authorization: accessToken}})
            await this.fetchGetUser(accessToken)
            return Promise.resolve()
        } catch (e: any) {
            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e.message)
        }
    },

    async fetchUserCreate(accessToken, userData): Promise<void> {
        try {
            await fetch.post<IFetchDeleteUserResponse>("/api/user/create", userData, {headers: {authorization: accessToken}})
            await this.fetchGetUser(accessToken)
            return Promise.resolve()
        } catch (e: any) {
            if (!isAxiosError(e)) return Promise.reject(e)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification}))
            return Promise.reject(e)
        }
    },

    setUserList(list: IUser[]): void {
        setState(state => ({...state, userList: list}))
    },

    setSelectedUser(user: IUser | null): void {
        setState(state => ({...state, selectedUser: user}))
    },

    setIsLoading(isLoading: boolean): void {
        setState(state => ({...state, isLoading}))
    }
})))