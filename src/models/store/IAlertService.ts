import {AlertProps} from "antd"


export type AlertType = 'success' | 'info' | 'warning' | 'error'
type Data = {
    type: AlertType
    message: string
    description?: string
}
export interface IAlertService {
    open: boolean
    data: Data
    setOpen(data: Data): void

    setClose(): void
}