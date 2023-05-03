import React, { FC, ReactNode } from 'react'
import {Alert, Layout, Space} from 'antd'
import Menu from "../Menu/Menu"
import Header from "../Header/Header"
import Content from "../Content/Content"
import Footer from "../Footer/Footer"


const Main: FC<{ children: ReactNode, title: string }> = ({ children, title}) => {

    return (
        <Layout style={{ minHeight: '100vh' }} className="overflow-auto">
            <Menu/>
            <Layout className="site-layout">
                <Header title={ title[0].toUpperCase() + title.slice(1) }/>
                <Content> { children } </Content>
                <Footer/>
            </Layout>
        </Layout>
    );
};

export default Main