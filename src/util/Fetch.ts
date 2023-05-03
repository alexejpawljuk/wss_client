import {config} from "../config"
import axios, {Axios, AxiosResponse, AxiosRequestConfig, isAxiosError, AxiosError, all} from "axios"
import {useAlertService} from "../stores/AlertService";

class Fetch {
    constructor(private readonly axios: Axios, private readonly baseUrl: string) {
    }

    async get<Data = any>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Data>> {
        const url = this.baseUrl + endpoint
        return await this.axios.get<Data>(url, config)
    }

    async post<Data = any>(endpoint: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<Data>> {
        const url = this.baseUrl + endpoint
        return await this.axios.post<Data>(url, data, config)
    }

    async put<Data = any>(endpoint: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<Data>> {
        const url = this.baseUrl + endpoint
        return await this.axios.put<Data>(url, data, config)
    }

    async delete<Data = any>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Data>> {
        const url = this.baseUrl + endpoint
        return await this.axios.delete<Data>(url, config)
    }

    errorHandler(e: any): void {


        if (isAxiosError(e)) {
            const err = e as AxiosError
            console.log("Axios error", err.message)
        } else {

            // Handle invalid access token
            if (e === "Request failed with status code 403") {
                alert("Access token is no longer valid. Please authenticate again!")
                window.location.reload()
                return
            }

            console.log("Fetch error:", e)
        }
    }
}

export const fetch = new Fetch(axios, config.baseUrl)