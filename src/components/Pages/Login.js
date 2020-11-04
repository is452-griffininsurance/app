import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Form, Input, Button, Card, Col, Row} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Content } = Layout;

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            password: '',
            errors: {}
        }
        const { history } = this.props

        this.onFinish = this.onFinish.bind(this)
    }


    onFinish(values) {
        localStorage.clear();
        localStorage.setItem('username', values.username);
        if (values.username == "griffin" && values.password == "123") {
            this.props.history.push("/home");
            localStorage.setItem('userType', 'user');
        }
        else if (values.username == "admin" && values.password == "123") {
            this.props.history.push("/regulators");
            localStorage.setItem('userType', 'admin');
        }
        window.location.reload();
    };
    render() {
        return (
            <>
                <Layout className="layout" style={{ minHeight: '100vh' }}>
                    <Content style={{ justify: "center" }}>
                        <div className="site-card-wrapper" style={{ justify: "center"}}>
                            <Row style={{ justify: "center", marginTop:'100px'}}>
                                <Col style={{width:'35%'}}></Col>
                                <Col style={{width:'30%', textAlign:'center'}}>
                                    <Card title={<img src={require('../Assets/Logo.png')} style={{height:'50%',width:'50%'}}/>} bordered={false} style={{textAlign:'center'}}>
                                        <Form
                                            name="normal_login"
                                            className="login-form"
                                            onFinish={this.onFinish}
                                        >
                                            <Form.Item
                                                name="username"
                                                rules={[{ required: true, message: 'Please input your Username!' }]}
                                            >
                                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                            </Form.Item>
                                            <Form.Item
                                                name="password"
                                                rules={[{ required: true, message: 'Please input your Password!' }]}
                                            >
                                                <Input
                                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Col>
                                <Col style={{width:'35%'}}></Col>
                            </Row>
                        </div>,


                    </Content>
                </Layout>
            </>
        );
    }
}
export default withRouter(Login);