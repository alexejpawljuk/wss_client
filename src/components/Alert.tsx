import React from 'react'
import {Space, Alert as _Alert} from "antd"
import {useAlertService} from "../stores/AlertService"

const Alert = () => {
    const alertService = useAlertService()

    const close = () => {
        alertService.setClose()
    }

    return (
        <>{alertService.open ?
            <Space style={{width: '100%', zIndex: 9}}
                   className={"position-absolute top-0 end-0 p-5"}
                   direction="vertical">
                <_Alert
                    {...alertService.data}
                    afterClose={close}
                    closeText="Close Now"
                    banner
                    closable
                />
            </Space> : <></>
        }</>
    )
}

export default Alert