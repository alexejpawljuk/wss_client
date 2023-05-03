import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from 'react'
import {Avatar, List, Popconfirm, Button} from 'antd'
import {useUserService} from "../../../stores/UserService"
import {IUser} from "../../../models/user/IUser"
import {config} from "../../../config"
import {DeleteOutlined, EditOutlined, SyncOutlined} from "@ant-design/icons"


const UserData: FC<{ user: IUser }> = ({user}): JSX.Element => {
    if (user.active) return (
        <span className="bg-success rounded bg-opacity-25 p-2"> {user.lastname + " " + user.firstname} </span>)
    else return (<span className="bg-danger rounded bg-opacity-25 p-2"> {user.lastname + " " + user.firstname} </span>)
}

interface IUserList {
    children?: ReactNode
    setEditProfile: Dispatch<SetStateAction<IUser | null>>
    setDeleteProfile: Dispatch<SetStateAction<IUser | null>>
    setRestoreProfile: Dispatch<SetStateAction<IUser | null>>
    setDestroyProfile: Dispatch<SetStateAction<IUser | null>>
}

const UserList: FC<IUserList> = ({children, setEditProfile, setDeleteProfile, setRestoreProfile, setDestroyProfile}) => {
    const userService = useUserService()

    const [loadingUserList, setLoadingUserList] = useState(false)
    const [userList, setUserList] = useState<IUser[]>([])

    const defaultAvatar = config.user.defaultAvatar

    // User list loading
    useEffect(() => {
        setLoadingUserList(userService.isLoading)
    }, [userService.isLoading])

    // Set users to list
    useEffect(() => {
        setUserList(userService.userList)
    }, [userService.userList, userService.users])

    useEffect(() => {
        userService.setSelectedUser(null)
    }, [])

    const setSelectedUser = (user: IUser) => {
        userService.setSelectedUser(user)
    }


    return (
        <div id="scrollableDiv"
             style={{
                 height: "70%",
                 overflow: 'auto',
                 padding: '0 0',
                 margin: "24px 0",
                 border: '1px solid rgba(140, 140, 140, 0.35)'
             }}>
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
                            avatar={<Avatar src={item.photo ? `data:image/png;base64,${item.photo}` : defaultAvatar}
                                            alt="Image"/>}
                            title={<UserData user={item}/>}
                            description={<span className="p-1"> {"Telegram ID: " + item.telegram_id} </span>}/>
                        <div>
                            {item.active ?
                                <div>
                                    <Popconfirm
                                        title="Edit profile"
                                        description={<span>{item.lastname + " " + item.firstname}</span>}
                                        placement="left"
                                        onConfirm={() => setEditProfile(item)}
                                    ><Button className="ms-2" icon={<EditOutlined/>}/>
                                    </Popconfirm>

                                    <Popconfirm
                                        title={"Delete profile"}
                                        description={<span>{item.lastname + " " + item.firstname}</span>}
                                        placement="left"
                                        onConfirm={() => setDeleteProfile(item)}
                                    ><Button className="ms-2" icon={<DeleteOutlined/>}/>
                                    </Popconfirm>
                                </div> :
                                <div>
                                    <Popconfirm
                                        title={"Restore profile"}
                                        description={<span>{item.lastname + " " + item.firstname}</span>}
                                        placement="left"
                                        onConfirm={() => setRestoreProfile(item)}
                                    ><Button className="ms-2" icon={<SyncOutlined/>}/>
                                    </Popconfirm>

                                    <Popconfirm
                                        title={"Destroy profile"}
                                        description={<span>Attention! The profile of {item.lastname + " " + item.firstname} will be permanently deleted and you will not be able to restore it!</span>}
                                        placement="left"
                                        onConfirm={() => setDestroyProfile(item)}
                                    ><Button className="ms-2" icon={<DeleteOutlined/>}/>
                                    </Popconfirm>
                                </div>}
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default UserList