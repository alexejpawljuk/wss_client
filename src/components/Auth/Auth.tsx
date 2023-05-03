import React, {FC, ReactNode} from 'react'
import {Layout} from "antd"
import Header from "../Header/Header"
import Content from "../Content/Content"
import Footer from "../Footer/Footer"
import AuthForm from "./AuthForm"

const Auth: FC<{ children?: ReactNode, title: string }> = ({ title }) => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Layout className="site-layout">
                <Header title={title}/>
                <Content>
                    <AuthForm/>
                </Content>
                <Footer/>
            </Layout>
        </Layout>
    );
};

export default Auth