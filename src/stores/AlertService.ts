import {create} from "zustand"
import {IAlertService} from "../models/store/IAlertService"
import {devtools} from "zustand/middleware";

export const useAlertService = create<IAlertService>()(devtools(setState => ({
    open: false,

    data: {
        type: "success",
        message: "",
        description: "",
    },

    setOpen(data): void {
        setState(state => ({...state, data, open: true}))
    },

    setClose(): void {
        setState(state => ({...state, data: {type: "success", message: "", description: ""}, open: false}))
    }
})))