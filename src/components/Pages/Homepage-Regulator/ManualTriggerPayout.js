import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Form, Input, Button, Card, Alert, Modal, Tag } from "antd";
// import { Link } from "react-router-dom";

const { Content, Footer } = Layout;

const { Search } = Input;

const initialFormData = Object.freeze({
  contract_address: "0x00",
});

function ManualTriggerPayout() {
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px", height: "100vh" }}>
          <h1 style={{ marginTop: 10 }}>Trigger Flight Insurance Payout</h1>
          <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 8 }}
            layout="horizontal"
          >
            <Form.Item label="Contract Address">
              <Input name="contract_address" onChange={handleChange} />
            </Form.Item>

            <Form.Item label="Event">
              <Input name="event" onChange={handleChange} />
            </Form.Item>

            <Form.Item>
              <Button type="primary">Trigger Payout</Button>
            </Form.Item>
          </Form>
          {/* <Modal
            title="⚠️ Proceed Payment"
            visible={this.visible}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
          >
            <p>
              You are about to make a payment of $2000 from your wallet
              (0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B)
            </p>
            <p>Do you want to proceed?</p>
          </Modal> */}
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default ManualTriggerPayout;
