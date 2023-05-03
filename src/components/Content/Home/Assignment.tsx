import React from 'react'
import {useAuthService} from "../../../stores/AuthService";

const Assignment = () => {

    const authService = useAuthService()

    return (
        <div className="w-50 p-3">
            <header className="text-center fw-bold">Assignment data</header>
            <div style={{marginBottom: 1}} className="row row-cols-2 text-center border">
                <div className="col-6 border-end">ID</div>
                <div className="col-6 border-end fst-italic">{authService.assignment?.assignment_id}</div>
            </div>
            <div style={{marginBottom: 1}} className="row row-cols-2 text-center border">
                <div className="col-6 border-end">Name</div>
                <div className="col-6 border-end fst-italic">{authService.assignment?.name}</div>
            </div>
            <div style={{marginBottom: 1}} className="row row-cols-2 text-center border">
                <div className="col-6 border-end">Address</div>
                <div className="col-6 border-end fst-italic">{authService.assignment?.address}</div>
            </div>
        </div>
    );
};

export default Assignment