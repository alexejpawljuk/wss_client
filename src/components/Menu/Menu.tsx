import React, {ReactNode, useEffect, useState} from 'react'
import {Button, Layout, Menu as _Menu, MenuProps} from "antd"
import {
    HomeOutlined,
    LogoutOutlined,
    MailOutlined,
    NotificationOutlined,
    UserOutlined,
    WechatOutlined
} from "@ant-design/icons"
import {IMenu} from "../../models/store/IMenuService"
import {useMenuService} from "../../stores/MenuService"
import Label from "./Label"
import {NavLink, useParams} from "react-router-dom"
import {useUserService} from "../../stores/UserService"
import {useAuthService} from "../../stores/AuthService"

const {Sider} = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: IMenu, icon?: ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem
}

const items: MenuItem[] = [
    getItem('Home', 'home', <NavLink to="/"><HomeOutlined /></NavLink>),
    getItem('Notification', 'notification', <NavLink to="/notification"><NotificationOutlined /></NavLink>),
    // getItem('Chat', 'chat', <NavLink to="/chat"><WechatOutlined /></NavLink>),
    getItem("User", "user", <NavLink to="/user"><UserOutlined /></NavLink>)
]

const Menu = () => {
    const menuService = useMenuService()
    const userService = useUserService()
    const authService = useAuthService()

    const [collapsed, setCollapsed] = useState(true)


    window.addEventListener("resize", () => {
        if (window.innerWidth <= 570) setCollapsed(true)
    })

    const logout = () => authService.logout()

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} trigger={null}>
            <Label>
                <Button
                    style={{width: "100%"}}
                    icon={ <LogoutOutlined /> }
                    onClick={logout}
                ></Button>
            </Label>


            <_Menu
                // expandIcon={() => <Button>Button</Button>}
                theme="dark"
                defaultSelectedKeys={[menuService.selected]}
                // defaultOpenKeys={[menuService.selected]}

                mode="inline"
                items={items}
                onSelect={item => {
                    menuService.setSelected(item.key as IMenu)
                    userService.setSelectedUser(null)
                }}
            />
        </Sider>
    );
};

export default Menu