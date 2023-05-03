import {create} from "zustand"
import {IMenu, IMenuService} from "../models/store/IMenuService";
import {devtools} from "zustand/middleware";

export const useMenuService = create<IMenuService>()(devtools(setState => ({
    selected: "home",

    setSelected(item: IMenu): void {
        setState(state => ({...state, selected: item}))
    }
})))

