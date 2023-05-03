export type IMenu = "home" | "notification" | "chat" | "user"
export interface IMenuService {
    selected: IMenu
    setSelected(item: IMenu): void
}