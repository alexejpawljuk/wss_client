import React, {FC} from 'react'
import {Layout, theme} from "antd"
import {useMenuService} from "../../stores/MenuService"
const _Header = Layout.Header

const Header: FC<{title?: string}> = ({title}) => {
    const {token: { colorBgLayout }} = theme.useToken()


    return (
        <><_Header className="text-center fs-2" style={{ padding: 0, background: colorBgLayout }} >
            <>{title}</>
        </_Header></>
    )
}

export default Header