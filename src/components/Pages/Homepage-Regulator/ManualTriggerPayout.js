import React from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Form,
  Input,
  Button,
  Card,
  Spin,
  Alert,
  Modal,
  Tag,
} from "antd";
// import { Link } from "react-router-dom";

const { Content, Footer } = Layout;

const { Search } = Input;

const initialFormData = Object.freeze({
  contract_address: "0x00",
});

class ManualTriggerPayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentAddress: "0x00",
      formData: initialFormData,
      formStatus: null,
      formMessage: "",
      loading: false,
      visible: false,
    };
  }

  // The componentDidMount() method runs after the component output has been rendered to the DOM
  componentDidMount() {
    if (window.ethereum) {
      window.ethereum.enable().then((account) => {
        const defaultAccount = account[0];
        this.setState({ currentAddress: defaultAccount });
      });
    }
  }

  handleChange = (e) => {
    const { formData } = this.state;
    console.log(e.target.name, e.target.value);
    this.setState({
      formData: {
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      },
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  calculatePayout = (e) => {
    const inputPremium = parseFloat(
      document.getElementById("premium_amount").value
    );
    const inputRatio = parseFloat(document.getElementById("ratio").value);
    document.getElementById("payout_coverage").value =
      inputPremium * inputRatio;
  };

  render() {
    return (
      <>
        <Layout className="layout">
          <Spin spinning={this.state.loading} tip="Loading..." size="large">
            <Content style={{ padding: "0 50px", height: "100vh" }}>
              <h1 style={{ marginTop: 10 }}>
                Trigger Flight Insurance Payout ✈️
              </h1>
              <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
              >
                {this.state.formMessage ? (
                  <>
                    <Alert
                      message={(this.state.formStatus, this.state.formMessage)}
                      type="success"
                      showIcon
                    />

                    {/* {this.state.formStatus}, {this.state.formMessage} */}
                  </>
                ) : (
                  <></>
                )}
                <Form.Item label="Contract Address">
                  <Input name="contract_address" onChange={this.handleChange} />
                </Form.Item>

                <Form.Item label="Flight Details">
                  <Tag color="green" onClick={this.showModal}>
                    Show Flight Details
                  </Tag>
                  <Modal
                    title="Flight details"
                    visible={this.state.visible}
                    footer={null}
                    closable
                    onCancel={this.handleCancel}
                  >
                    <Card border="true" size="small">
                      <Form.Item label="Date of Departure">
                        31/12/2020
                      </Form.Item>
                      <Form.Item label="From">Singapore</Form.Item>
                      <Form.Item label="To">Hong Kong</Form.Item>
                    </Card>
                  </Modal>
                </Form.Item>

                <Form.Item label="Premium">
                  <Input
                    name="premium_amount"
                    id="premium_amount"
                    defaultValue={0.0001}
                    min={0.0001}
                    onChange={this.handleChange}
                    suffix="ETH"
                  />
                </Form.Item>

                <Form.Item label="Ratio">
                  <Input
                    name="ratio"
                    id="ratio"
                    defaultValue={10}
                    min={10}
                    max={1}
                    disabled
                  />
                </Form.Item>

                <Form.Item label="Payout Coverage">
                  {/* premium * ratio */}

                  {/* <Input
                    defaultValue={0}
                    min={0}
                    suffix="ETH"
                  /> */}
                  <Search
                    id="payout_coverage"
                    placeholder="Calculate max payout coverage"
                    enterButton="Calculate"
                    onSearch={this.calculatePayout}
                    suffix="ETH"
                  />
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
          </Spin>
          <Footer />
        </Layout>
      </>
    );
  }
}

export default ManualTriggerPayout;
