import 'bootstrap/dist/css/bootstrap.css'
import React, {useEffect} from 'react'
import {Routes, Route} from "react-router-dom"
import {fetch} from "./util/Fetch"

import Notification from "./components/Content/Notification/Notification"
import Main from "./components/Main/Main"
import Chat from "./components/Content/Chat/Chat"
import User from "./components/Content/User/User"
import Auth from "./components/Auth/Auth"
import Home from "./components/Content/Home/Home"
import NotFound from "./components/Content/404/NotFound"
import Alert from "./components/Alert"

import {useAuthService} from "./stores/AuthService"
import {useUserService} from "./stores/UserService"
import {useMenuService} from "./stores/MenuService"
import {useNotificationDataService} from "./stores/NotificationDataService"


function App() {
    const authService = useAuthService()
    const userService = useUserService()
    const menuService = useMenuService()
    const notificationDataService = useNotificationDataService()

    // Temp
    // useEffect(() => {
    //     authService.fetchAuth("admin", "1").catch(fetch.errorHandler)
    // }, [])

    useEffect(() => {
        if (!authService.accessToken) return
        const accessToken = authService.accessToken

        userService.fetchGetUser(accessToken).catch(fetch.errorHandler)
        notificationDataService.fetchGetDefaultData(accessToken).catch(fetch.errorHandler)
    }, [authService.accessToken])


    return (
        <div className="App container-fluid min-vw-570 p-0" style={{minWidth: 570}}>
            <Alert/>
            {authService.accessToken ?
                <Main title={menuService.selected}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/notification" element={<Notification/>}/>
                        <Route path="/chat" element={<Chat/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Main> :
                <Auth title="SMI">

                </Auth>
            }
        </div>
    )
}

export default App
