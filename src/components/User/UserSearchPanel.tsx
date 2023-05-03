import React, {useEffect, useMemo, useState} from 'react'
import {fetch} from "../../util/Fetch"
import {Button, Input, Select} from 'antd'
import {useUserService} from "../../stores/UserService"
import {SortSelector} from "../../models/store/IUserService"
import {ReloadOutlined} from "@ant-design/icons"
import {useAuthService} from "../../stores/AuthService"
import {useNotificationDataService} from "../../stores/NotificationDataService";


const UserSearchPanel: React.FC = () => {
    const userService = useUserService()
    const authService = useAuthService()
    const notificationService = useNotificationDataService()

    const [searchValue, setSearchValue] = useState<string>("")
    const [sortValue, setSortValue] = useState<SortSelector>("lastname")
    const [activeUsers, setActiveUsers] = useState<boolean>(true)

    const filteredUsersByActivity = useMemo(() => userService.users.filter(user => user.active === activeUsers), [activeUsers, userService.users])
    const sortedUsers = useMemo(() => filteredUsersByActivity.sort((a, b) => a[sortValue].localeCompare(b[sortValue])), [sortValue, filteredUsersByActivity])
    const filteredUsersByName = useMemo(() => sortedUsers.filter(user => (user.lastname + " " + user.firstname + " " + user.telegram_id).toLowerCase().includes(searchValue.toLowerCase())), [searchValue, sortedUsers])


    // Sort users
    useEffect(() => {
        console.log("Users sorted")
        userService.setUserList(sortedUsers)
    }, [sortValue])

    // Filter users
    useEffect(() => {
        console.log("Users filtered")
        userService.setUserList(filteredUsersByName)
    }, [filteredUsersByActivity, filteredUsersByName])


    const refreshUserList = () => {
        userService
            .fetchGetUser(authService.accessToken)
            .then(() => {
                userService.setSelectedUser(null)
                notificationService.dataToDefaultState()
            })
            .catch(e => {
                userService.setSelectedUser(null)
                notificationService.dataToDefaultState()
                fetch.errorHandler(e)
            })
    }

    return (
        <Input.Group compact className="d-flex">

            <Select
                style={{width: "10%"}}
                defaultValue="lastname"
                value={sortValue}
                onChange={setSortValue}
                options={[{value: "firstname", label: "Firstname"}, {value: "lastname", label: "Lastname"}]}
                disabled={userService.isLoading}
            />

            <Select
                style={{width: "10%"}}
                defaultValue="active"
                onChange={e => setActiveUsers(e as unknown as boolean)}
                options={[{value: true, label: "Active"}, {value: false, label: "Inactive"}]}
                disabled={userService.isLoading}
            />

            <Button
                className=""
                onClick={refreshUserList}
                icon={<ReloadOutlined spin={userService.isLoading}/>}
                disabled={userService.isLoading}
            />

            <Input.Search
                style={{width: '75%'}}
                className="ms-auto"
                placeholder="search..."
                allowClear
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                disabled={userService.isLoading}
            />

        </Input.Group>
    )
}

export default UserSearchPanel