import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from 'react'
import {Avatar, Button, Card, Image, List} from 'antd'
import {useUserService} from "../../../stores/UserService"
import {IUser} from "../../../models/user/IUser"
import {InfoCircleOutlined, SendOutlined} from "@ant-design/icons"
import Meta from "antd/es/card/Meta";
import {useNotificationDataService} from "../../../stores/NotificationDataService";
import {useAuthService} from "../../../stores/AuthService";
import {fetch} from "../../../util/Fetch";
import {useAlertService} from "../../../stores/AlertService";
import alert from "../../Alert";
import * as buffer from "buffer";

const UserData: FC<{ user: IUser }> = ({user}): JSX.Element => {
    if (user.active) return (
        <span className="bg-success rounded bg-opacity-25 p-2"> {user.lastname + " " + user.firstname} </span>)
    else return (<span className="bg-danger rounded bg-opacity-25 p-2"> {user.lastname + " " + user.firstname} </span>)
}


const UserList: FC<{ children?: ReactNode }> = ({children}) => {
    const notificationDataService = useNotificationDataService()
    const authService = useAuthService()
    const userService = useUserService()
    const alertService = useAlertService()

    const [loadingUserList, setLoadingUserList] = useState(false)
    const [userList, setUserList] = useState<IUser[]>([])
    const [loadingSendNotification, setLoadingSendNotification] = useState<{user: IUser, loading: boolean}>()

    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    // User list loading
    useEffect(() => {
        setLoadingUserList(userService.isLoading)
    }, [userService.isLoading])

    // Set users to list
    useEffect(() => {
        setUserList(userService.userList)
    }, [userService.userList, userService.users])

    const setSelectedUser = (user: IUser) => {
        userService.setSelectedUser(user)
    }


    const sendNotification = (user: IUser) => {
        if (!authService.admin) return
        setLoadingSendNotification(prevState => ({...prevState, user, loading: true}))
        notificationDataService
            .fetchSendNotification(user, authService.admin, notificationDataService.data.notification_text, authService.accessToken)
            .then(() => {
                setLoadingSendNotification(prevState => ({...prevState, user, loading: false}))
            })
            .catch(e => {
                setLoadingSendNotification(prevState => ({...prevState, user, loading: false}))
                fetch.errorHandler(e)
            })
    }

    return (
        <div id="scrollableDiv"
             style={{height: "70%", overflow: 'auto', padding: '0 0', margin: "24px 0", border: '1px solid rgba(140, 140, 140, 0.35)'}}>
            <List
                loading={loadingUserList}
                dataSource={userList}
                renderItem={(item) => (
                    <List.Item
                        className={userService.selectedUser?.telegram_id === item.telegram_id ? "selected_list_item  ps-4 pe-4" : "hover_list_item ps-4 pe-4"}
                        key={item.telegram_id}
                        onClick={() => {
                            setSelectedUser(item)
                        }}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photo ? `data:image/png;base64,${item.photo}` : defaultAvatar} alt="Image"/>}
                            title={<UserData user={item}/>}
                            description={<span className="p-1"> {"Telegram ID: " + item.telegram_id} </span>}/>
                        <Button
                            loading={loadingSendNotification?.user.telegram_id === item.telegram_id ? loadingSendNotification?.loading : false}
                            icon={<SendOutlined className="pb-5"/>}
                            disabled={!item.active}
                            onClick={() => sendNotification(item)}/>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default UserList