import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import { Form, Input, Button, Checkbox } from 'antd';
import {logoin,getToken} from '../../api/system/users'
import "./index.css"
class Login extends Component {
    
    render() {
        const layout = {
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 12,
            },
          };
          const tailLayout = {
            wrapperCol: {
              offset: 8,
              span: 8,
            },
          };
          
        // const Demo = () => {}
        const onFinish = (values) => {
            console.log('Success:', values);
            if(values.password&&values.username) {
                // this.props.history.push('/admin/home')
                logoin({username:values.username,password:values.password}).then(res=>{
                    if(res.code===200) {
                        getToken().then(res=>{
                            console.log(res)
                        })
                        this.props.history.push('/admin/home')
                    } else {

                    }
                })
                
            }
        };
        const onFinishFailed = (errorInfo) => {
              console.log('Failed:', errorInfo);
         };
        return (
            <div className="login">
                <div className="wrapper">
                    <Form {...layout} name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名！',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="密 &nbsp;  &nbsp;码 "  name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            登&nbsp;&nbsp;录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)
