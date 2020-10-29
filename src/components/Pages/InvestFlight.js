import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import {
    Layout,
    Form,
    Input,
    Button,
    Card,
    InputNumber,
    Progress,
} from 'antd';


const { Content, Footer } = Layout;

class Insurance extends React.Component {


    render() {

        // send to bc backend 
        
        return (
            <>
                <Layout className="layout">
                    <Content style={{ padding: '0 50px' }}>
                        <h1 style={{ marginTop: 10 }}>Create Flight Insurance ✈️</h1>
                        <Form
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 8 }}
                            layout="horizontal"
                        >
                            <Form.Item label="Percentage insured">
                                <Progress percent={50} status="active" />
                            </Form.Item>

                            <Form.Item label="Flight Number">
                                <Input 
                                    defaultValue={"BA2491A"}
                                />
                            </Form.Item>

                            <Form.Item label="Flight Details">
                                <Card border="true" size="small">
                                    <Form
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                    >
                                        <Form.Item label="Date of Departure">
                                            31/12/2020
                                        </Form.Item>
                                        <Form.Item label="From">
                                            Singapore
                                        </Form.Item>
                                        <Form.Item label="To">
                                            Hong Kong
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Form.Item>

                            <Form.Item label="Pax">
                                <InputNumber
                                    defaultValue={1}
                                    min={1}
                                />
                            </Form.Item>

                            <Form.Item label="Premium">
                                {/* this is how much money they will get, so it should be calculated */}
                                <InputNumber
                                    defaultValue={0}
                                    min={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>

                            <Form.Item label="Ratio">
                                <InputNumber
                                    defaultValue={0}
                                    min={1}
                                />
                            </Form.Item>

                            <Form.Item label="Payout Coverage">
                                {/* how much investors wanna cover */}
                                <InputNumber
                                    defaultValue={0}
                                    min={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary">Submit</Button>
                                <Button type="primary" danger>Report</Button>
                            </Form.Item>

                        </Form>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </>
        );
    }
}

export default Insurance;
