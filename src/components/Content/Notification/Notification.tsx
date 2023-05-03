import React, {FC, useEffect, useState} from 'react'
import UserList from "./UserList"
import UserSearchPanel from "../../User/UserSearchPanel"
import OptionsPlace from "../OptionsPlace/OptionsPlace"
import TextArea from "antd/es/input/TextArea"
import {Button, Input, Spin, Switch} from "antd"
import {useNotificationDataService} from "../../../stores/NotificationDataService"
import {useUserService} from "../../../stores/UserService"
import {useAuthService} from "../../../stores/AuthService"
import {INotificationHistory} from "../../../models/store/INotificationService"
import moment from "moment"
import {fetch} from "../../../util/Fetch"
import {InfoCircleTwoTone} from "@ant-design/icons"


const NotificationHistoryItem: FC<{ notificationHistory: INotificationHistory }> = ({notificationHistory}): JSX.Element => {
    const date = new Date(notificationHistory.date)
    const dateDisplay = moment(date).format('DD-MM-YYYY, HH:mm:ss')

    return (
        <div className="bg-success bg-opacity-25 rounded p-1 mb-2">
            <div style={{fontSize: 8}} className="text-muted text-decoration-underline">
                {dateDisplay}
            </div>
            <div style={{fontSize: 10}}>
                {notificationHistory.message}
            </div>
        </div>
    )
}


const Notification = () => {
    const notificationDataService = useNotificationDataService()
    const userService = useUserService()
    const authService = useAuthService()

    const [disableTextArea, setDisableTextArea] = useState<boolean>(false)
    const [textMessage, setTextMessage] = useState<string>("")
    const [notificationHistory, setNotificationHistory] = useState<INotificationHistory[]>([])
    const [loadingNotificationHistory, setLoadingNotificationHistory] = useState<boolean>(false)

    const output = document.querySelector("#notification_log_output")

    // Scroll Notification history down
    useEffect(() => {
        if (output) output.scrollTop = output.scrollHeight
    }, [notificationHistory])

    // Get text for notification
    useEffect(() => {
        setTextMessage(notificationDataService.data?.notification_text)
    }, [notificationDataService.data?.notification_text])

    // Set notification history
    useEffect(() => {
        setNotificationHistory(notificationDataService.notificationHistory)
    }, [notificationDataService.notificationHistory])

    // Fetch notification history by change a selected user
    useEffect(() => {
        notificationDataService.notificationHistory = []
        if (!userService.selectedUser) return
        setLoadingNotificationHistory(true)
        notificationDataService
            .fetchGetNotificationHistory(userService.selectedUser, authService.accessToken)
            .then(() => {
                setLoadingNotificationHistory(false)
            })
            .catch(e => {
                setLoadingNotificationHistory(false)
                fetch.errorHandler(e)
            })
    }, [userService.selectedUser])

    // Delete state selected user
    useEffect(() => {
        userService.setSelectedUser(null)
    }, [])

    const saveNotificationText = () => {
        notificationDataService
            .fetchSetNotificationText(authService.accessToken, textMessage)
            .then(() => setDisableTextArea(false))
            .catch(fetch.errorHandler)
    }

    return (
        <div className="row justify-content-between" style={{height: "100%"}}>

            <OptionsPlace>
                <div style={{height: "70%", width: "100%"}} className="d-flex flex-wrap justify-content-between">
                    <Input.Group style={{height: 85}} className="d-flex col-4 col-md-5">

                        <Input.Group className="col-1">
                            <Switch
                                className="me-2 pe-2"
                                defaultChecked={disableTextArea}
                                checkedChildren="disable"
                                unCheckedChildren="enable"
                                checked={disableTextArea}
                                onChange={(state) => setDisableTextArea(state)}/>
                            <Button
                                className="mt-2"
                                type="primary"
                                size="small"
                                disabled={!disableTextArea}
                                onClick={saveNotificationText}>Save</Button>
                        </Input.Group>

                        <Input.Group style={{height: "100%"}} className="col-10">
                            <TextArea
                                style={{height: "100%", resize: 'none', fontSize: 10}}
                                className="rounded"
                                disabled={!disableTextArea}
                                value={textMessage}
                                onChange={e => setTextMessage(e.target.value)}
                                placeholder="Please input your message..."/>

                        </Input.Group>

                    </Input.Group>

                    <div id="notification_log_container"
                         style={{height: 85, width: "50%", position: "relative"}}
                         className="border p-3 pb-0 rounded">
                        {(!userService.selectedUser?.lastname || !userService.selectedUser?.firstname) ? null :
                            <label style={{
                                position: "absolute",
                                top: -10,
                                left: 16,
                                padding: "0 5px",
                            }} className={"bg-success bg-opacity-25 rounded"} htmlFor="notification_log_container">
                                {userService.selectedUser?.lastname + " " + userService.selectedUser.firstname}
                            </label>
                        }

                        <div id="notification_log_output" style={{height: "100%", width: "100%", overflowY: "scroll"}}>
                            {loadingNotificationHistory ?
                                <div style={{width: "100%"}} className={"d-flex justify-content-center"}><Spin/></div> :
                                notificationHistory.length ?
                                    notificationHistory.map(item => <NotificationHistoryItem
                                        key={new Date(item.date).getTime()} notificationHistory={item}/>) :
                                    userService.selectedUser ? <div className={"text-center fw-bold"}>
                                        <div style={{height: 30}}><InfoCircleTwoTone/></div>
                                        Notification history with user <span
                                        className={"text-decoration-underline"}>{userService.selectedUser.lastname} {userService.selectedUser.firstname}</span> not
                                        found.
                                    </div> : <></>
                            }
                        </div>
                    </div>
                </div>

                <div style={{height: "30%"}} className="d-flex flex-row align-items-end">
                    <UserSearchPanel/>
                </div>
            </OptionsPlace>

            <UserList/>
        </div>
    )
}

export default Notification