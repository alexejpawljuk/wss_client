import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {IAuthService} from "../models/store/IAuthService"
import {INotificationData} from "../models/INotificationData"
import {fetch} from "../util/Fetch"
import {IFetchError, IFetchLoginResponse} from "../models/util/IFetch"
import {AxiosResponse, isAxiosError} from "axios"

const validator = {
    loginResponse(response: AxiosResponse<IFetchLoginResponse>): boolean {
        let isValidResponse = true
        if (!response?.data?.notification) isValidResponse = false
        if (!response?.data?.accessToken) isValidResponse = false
        return isValidResponse
    }
}

export const useAuthService = create<IAuthService>()(devtools(setState => ({
    accessToken: null,
    assignment: null,
    admin: null,
    isLoading: false,
    notification: {} as INotificationData,
    async fetchAuth(login: string, password: string): Promise<void> {
        try {
            setState(state => ({...state, isLoading: true}))

            const response = await fetch.post<IFetchLoginResponse>("/api/auth/login", {login, password})

            if (!validator.loginResponse(response)) return console.log("Login data response is not valid.")

            setState(state => ({
                ...state,
                accessToken: response.data.accessToken,
                assignment: response.data.assignment,
                admin: response.data.admin,
                isLoading: false,
                notification: response.data.notification,
            }))

            return Promise.resolve()
        } catch (e: any) {
            setState(state => ({...state, isLoading: false}))

            if (!isAxiosError(e)) return Promise.reject(e.message)
            setState(state => ({...state, notification: (e as IFetchError).response?.data?.notification,}))
            return Promise.reject(e.message)
        }
    },
    logout(): void {
        window.location.reload()
        window.location.replace("/")
    },
})))