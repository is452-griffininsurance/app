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
    Modal,
} from 'antd';

const { Content, Footer } = Layout;

const { TextArea } = Input;

class Insurance extends React.Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        // create smart contract first
        // may payment later 

        // premium: pay to investor  
        // payout coverage: investor to policyholder 

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
                            <Form.Item label="Flight Number">
                                <Input />
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

                            {/* <Form.Item label="Pax">
                                <InputNumber
                                    defaultValue={1}
                                    min={1}
                                />
                            </Form.Item> */}

                            <Form.Item label="Premium">
                                <InputNumber
                                    defaultValue={0}
                                    min={0}
                                    formatter={value => `${value} ETH`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                                <InputNumber
                                    defaultValue={0}
                                    min={0}
                                    formatter={value => `${value} ETH`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" onClick={this.showModal}>Submit</Button>
                            </Form.Item>
                        </Form>
                        <Modal
                            title="⚠️ Proceed Payment" 
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>You are about to make a payment of $2000 from your wallet (0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B)</p>
                            <p>Do you want to proceed?</p>
                        </Modal>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </>
        );
    }
}



export default Insurance;
