import React from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Form, Input} from 'antd'
import {useAuthService} from "../../stores/AuthService";

const AuthForm: React.FC = () => {
    const authService = useAuthService()
    const onFinish = (values: {username: string, password: string}) => {
        console.log('Received values of form: ', values)
        authService.fetchAuth(values.username, values.password).catch(console.log)
    }

    return (
        <div style={{height: "100%", padding: 24}} className="grad">
            <Form
                name="normal_login"
                style={{height: "100%"}}
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    style={{width: "90%"}}
                    className="d-flex justify-content-center align-item-center"
                    // rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    style={{width: "90%"}}
                    className={"d-flex justify-content-center"}
                    // rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item className={"d-flex justify-content-center"}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AuthForm