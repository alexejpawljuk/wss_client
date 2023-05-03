import React from 'react'
import {useAuthService} from "../../../stores/AuthService"
import AccountData from "./AccountData"
import Assignment from "./Assignment"

const Home = () => {
    const authService = useAuthService()

    return (
        <div>
            <div className="d-flex flex-wrap">
                <AccountData />
                <Assignment />
            </div>
        </div>
    );
};

export default Home