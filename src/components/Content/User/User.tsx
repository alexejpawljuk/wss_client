import React, {ChangeEvent, useEffect, useState} from 'react'
import OptionsPlace from "../OptionsPlace/OptionsPlace"
import UserSearchPanel from "../../User/UserSearchPanel"
import UserList from "./UserList"
import {Button, Input, Popconfirm, Select, Switch} from "antd"
import {useUserService} from "../../../stores/UserService"
import {Firstname, IUser, IUserCreateForm, Language, Lastname, Telegram_id, User_id} from "../../../models/user/IUser"
import {useAuthService} from "../../../stores/AuthService"
import {useAlertService} from "../../../stores/AlertService"
import {log} from "util";
import {isAxiosError} from "axios";


type ActionType = "editing" | "create" | null
type LanguageOption = { value: Language, label: string }
type InputStatus = "warning" | "error" | ""
type InputFormStatuses = {firstname: InputStatus, lastname: InputStatus, telegram_id: InputStatus, language: InputStatus}

const User = () => {
    const userService = useUserService()
    const authService = useAuthService()
    const alertService = useAlertService()

    const languageOption: LanguageOption[] = [{value: "DE", label: "DE"}, {value: "EN", label: "EN"}, {
        value: "RU",
        label: "RU"
    }]

    const inputStyle = {width: "60%", height: 25, margin: 1, padding: 0}

    const [disableInput, setDisableInput] = useState<boolean>(true)
    const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true)
    const [disableCreateBtn, setDisableCreateBtn] = useState<boolean>(false)
    const [disableCancelBtn, setDisableCancelBtn] = useState<boolean>(true)

    const [action, setAction] = useState<ActionType>(null)

    const [profileData, setProfileData] = useState<IUserCreateForm | null>(null)
    const [inputStatus, setInputStatus] = useState<InputFormStatuses>({firstname: "", lastname: "", telegram_id: "", language: ""})
    const [editProfile, setEditProfile] = useState<IUser | null>(null)
    const [deleteProfile, setDeleteProfile] = useState<IUser | null>(null)
    const [restoreProfile, setRestoreProfile] = useState<IUser | null>(null)
    const [destroyProfile, setDestroyProfile] = useState<IUser | null>(null)

    // Edit profile
    useEffect(() => {
        if (!editProfile) return
        const {firstname, lastname, telegram_id, language} = editProfile
        setProfileData(prevState => ({...prevState, firstname, lastname, telegram_id, language}))
        setAction("editing")
        setDisableInput(false)
        setDisableSaveBtn(false)
        setDisableCreateBtn(true)
    }, [editProfile])

    // Delete profile
    useEffect(() => {
        if (!deleteProfile) return
        userService.fetchUserDelete(authService.accessToken, deleteProfile.telegram_id).catch(e => console.log(e))
    }, [deleteProfile])

    // Destroy profile
    useEffect(() => {
        if (!destroyProfile) return
        userService.fetchUserDestroy(authService.accessToken, destroyProfile.telegram_id).catch(e => console.log(e))
    }, [destroyProfile])

    // Restore profile
    useEffect(() => {
        if (!restoreProfile) return
        userService.fetchUserRestore(authService.accessToken, restoreProfile.telegram_id).catch(e => console.log(e))
    }, [restoreProfile])

    useEffect(() => {
        if (profileData) setDisableCancelBtn(false)
        else setDisableCancelBtn(true)
    }, [profileData])

    const onEditProfile = () => {
        if (!profileData) return setInputStatus(prevState => ({...prevState, firstname: "error", lastname: "error", telegram_id: "error", language: "error"}))
        const {firstname, lastname, telegram_id, language} = profileData

        if (!firstname) return setInputStatus(prevState => ({...prevState, firstname: "error", lastname: "", telegram_id: ""}))
        else if (!lastname) return setInputStatus(prevState => ({...prevState, firstname: "", lastname: "error", telegram_id: ""}))
        else if (!telegram_id) return setInputStatus(prevState => ({...prevState, firstname: "", lastname: "", telegram_id: "error"}))
        else if (!language) return setInputStatus(prevState => ({...prevState, firstname: "", lastname: "", telegram_id: "error"}))
        else setInputStatus(prevState => ({...prevState, firstname: "", lastname: "", telegram_id: ""}))

        userService
            .fetchUserEdit(authService.accessToken, {user_id: editProfile?.user_id as User_id ,formData: {firstname, lastname, telegram_id, language}})
            .then(() => {
                onCancel()
            })
            .catch(e => {
                alertService.setOpen({type: "error", message: "The new user has not been edited!"})
                console.log(e)
            })
    }

    const create = () => {
        console.log("create")
        if (!profileData) return setInputStatus(prevState => ({...prevState, firstname: "error", lastname: "error", telegram_id: "error", language: "error"}))
        const {firstname, lastname, telegram_id, language} = profileData
        if (!firstname) return setInputStatus(prevState => ({...prevState, firstname: "error", lastname: "", telegram_id: ""}))
        else if (!lastname) return setInputStatus(prevState => ({...prevState, firstname: "", lastname: "error", telegram_id: ""}))
        else if (!telegram_id) return setInputStatus(prevState => ({...prevState, firstname: "", lastname: "", telegram_id: "error"}))
        else if (!language) return setInputStatus(prevState => ({...prevState, firstname: "", lastname: "", telegram_id: "error"}))
        else setInputStatus(prevState => ({...prevState, firstname: "", lastname: "", telegram_id: ""}))

        userService
            .fetchUserCreate(authService.accessToken, profileData)
            .then(() => {
                onCancel()
            })
            .catch((e: any) => {
                if (isAxiosError(e)) return alertService.setOpen({type: "error", message: e.response?.data?.notification?.description})
                console.log(e)
            })
    }

    const save = () => {
        if (action === "editing") onEditProfile()
        if (action === "create")  create()
    }

    const onCreateProfile = () => {
        setAction("create")
        setDisableInput(false)
        setDisableSaveBtn(false)
        setDisableCancelBtn(false)
        setDisableCreateBtn(true)
    }

    const onCancel = () => {
        console.log("cansel")
        setAction(null)
        setEditProfile(null)
        setProfileData(null)
        setDisableSaveBtn(true)
        setDisableCreateBtn(false)
        setDisableInput(true)
        setDisableCancelBtn(true)
    }

    return (
        <div className="row justify-content-between" style={{height: "100%"}}>

            <OptionsPlace>
                <div style={{height: "70%"}} className={"d-flex"}>

                    <Input.Group style={{width: 100}} className="col-1">

                        <Popconfirm
                            title="Save user"
                            description={
                                <>Are you sure you want to change the user<span className={"badge bg-primary text-wra ms-1"}>{profileData?.firstname + " " + profileData?.lastname}</span> ?</>
                            }
                            placement="right"
                            onConfirm={save}
                            disabled={disableSaveBtn}
                            // okButtonProps={{loading: loadingSaveProfile}}
                            // onCancel={canselSaveProfile}
                        >
                            <Button
                                className="mb-2"
                                type="primary"
                                size="small"
                                disabled={disableSaveBtn}
                                // onClick={saveProfile}
                            >Save</Button>
                        </Popconfirm>

                        <Button
                            className="mb-2"
                            type="primary"
                            size="small"
                            disabled={disableCreateBtn}
                            onClick={onCreateProfile}
                        >Create</Button>

                        <Button
                            className="mb-2"
                            type="primary"
                            size="small"
                            disabled={disableCancelBtn}
                            onClick={onCancel}
                        >Cansel</Button>

                    </Input.Group>

                    <div className={"col-11"}>
                        <Input.Group className={"d-flex flex-column"}>

                            <Input
                                style={inputStyle}
                                className={"rounded pe-1"}
                                value={profileData?.firstname}
                                prefix={<span className="badge bg-primary text-wra ms-1">Firstname:</span>}
                                status={inputStatus.firstname}
                                disabled={disableInput}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setProfileData(prevState => ({...prevState, firstname: e.target.value} as IUserCreateForm))}
                            />

                            <Input
                                style={inputStyle}
                                className={"rounded pe-1"}
                                value={profileData?.lastname}
                                prefix={<span className="badge bg-primary text-wra ms-1">Lastname:</span>}
                                status={inputStatus.lastname}
                                disabled={disableInput}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setProfileData(prevState => ({...prevState, lastname: e.target.value} as IUserCreateForm))}
                            />

                            <Input
                                style={inputStyle}
                                className={"rounded pe-1"}
                                value={profileData?.telegram_id}
                                prefix={<span className="badge bg-primary text-wra ms-1">Telegram ID:</span>}
                                status={inputStatus.telegram_id}
                                disabled={disableInput}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setProfileData(prevState => ({...prevState, telegram_id: e.target.value} as IUserCreateForm))}
                            />

                            <Select
                                style={inputStyle}
                                className={"rounded"}
                                value={profileData?.language}
                                status={inputStatus.language}
                                defaultValue={"DE"}
                                disabled={disableInput}
                                options={languageOption}
                                onChange={value => setProfileData(prevState => ({...prevState, language: value} as IUserCreateForm))}
                            />

                        </Input.Group>
                    </div>

                </div>

                <div style={{height: "30%"}} className="d-flex flex-row align-items-end">
                    <UserSearchPanel/>
                </div>
            </OptionsPlace>

            <UserList
                setEditProfile={setEditProfile}
                setDeleteProfile={setDeleteProfile}
                setRestoreProfile={setRestoreProfile}
                setDestroyProfile={setDestroyProfile}
            />
        </div>
    );
};

export default User