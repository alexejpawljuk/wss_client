export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type Message = string
export type Description = string

export type Duration = number
export type Placement = 'topLeft' | "topRight" | "bottomLeft" | "bottomRight"

export interface INotificationData {
    type: NotificationType
    message: Message
    description: Description
}