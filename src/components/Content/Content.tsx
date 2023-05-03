import React, {FC, ReactNode, useEffect, useState} from 'react'
import {theme} from "antd"
import {Content as _Content} from "antd/es/layout/layout"
import {useAuthService} from "../../stores/AuthService";


const Content: FC<{ children?: ReactNode }> = ({children}): JSX.Element => {
    const {token: {colorBgContainer}} = theme.useToken()
    const authService = useAuthService()
    const [padding, setPadding] = useState<number>(0)

    useEffect(() => {
        if (authService.accessToken) setPadding(24)
        else setPadding(0)
    }, [authService.accessToken])

    return (
        <_Content style={{margin: '0 16px'}}>
            <div
                className="overflow-scroll"
                style={{padding: padding, minHeight: 360, height: "80vh", background: colorBgContainer}}>
                {children}
            </div>
        </_Content>
    )
}

export default Content