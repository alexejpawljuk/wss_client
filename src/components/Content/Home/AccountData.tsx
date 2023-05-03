import React from 'react'
import {useAuthService} from "../../../stores/AuthService"

const AccountData = () => {
    const authService = useAuthService()

    return (
        <div className="w-25 p-3">
            <header className="text-center fw-bold">Account data</header>
            <div style={{marginBottom: 1}} className="row row-cols-2 text-center border">
                <div className="col-6 border-end">ID</div>
                <div className="col-6 border-end fst-italic">{authService.admin?.id}</div>
            </div>
            <div style={{marginBottom: 1}} className="row row-cols-2 text-center border">
                <div className="col-6 border-end">Name</div>
                <div className="col-6 border-end fst-italic">{authService.admin?.name}</div>
            </div>
        </div>
    );
};

export default AccountData