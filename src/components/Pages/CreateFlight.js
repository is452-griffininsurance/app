import React from "react";
import Web3 from "web3";
import "antd/dist/antd.css";
import { Layout, Form, Input, Button, Card, Spin, Alert, Modal, Tag } from "antd";
import FlightInsurance from "../../blockchain/abis/FlightInsurance.json";
import { API_URL } from "../../utils/utils";
// import { Link } from "react-router-dom";

const { Content, Footer } = Layout;

const { Search } = Input;

const initialFormData = Object.freeze({
  flightCode: "SQ306",
  flightDate: "2020-11-30",
  premium_amount: 0.0001,
});

const web3 = new Web3(Web3.givenProvider);
class CreateFlight extends React.Component {
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
        web3.eth.defaultAccount = defaultAccount;
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

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  calculatePayout = e => {
    var inputPremium = parseFloat(document.getElementById('premium_amount').value)
    var inputRatio = parseFloat(document.getElementById('ratio').value)
    document.getElementById('payout_coverage').value = inputPremium * inputRatio
  }

  DeployContractButton = () => {
    const { visible, currentAddress, formData, formStatus } = this.state;

    const deploySmartFlightInsurance = () => {
      // This is our event
      this.setState({ loading: true }); // Show loading spinner or something
      // Deploying contract should be done through our backend service
      const flightInsurance = new web3.eth.Contract(FlightInsurance.abi);
      flightInsurance
        .deploy({
          data: `${FlightInsurance.bytecode}`,
          arguments: [
            web3.utils.toHex(formData.flightCode), // need to toHex
            web3.utils.toHex(formData.flightDate),
          ],
        })
        .send({
          from: currentAddress,
          value: web3.utils.toWei(formData.premium_amount.toString(), "ether"),
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("Success!");
          if (confirmationNumber === 0) {
            console.log(receipt);
            const data = {
              contract_address: receipt.contractAddress,
              tncs: "Sample T&Cs",
              flight_no: formData.flightCode,
              flight_date: formData.flightDate,
              insured_wallet_addr: currentAddress,
              premium_amount: formData.premium_amount,
              min_insure_amount: 0.25 * formData.premium_amount,
              max_insure_amount: 10 * formData.premium_amount,
              coverage_amount: 0,
            };
            console.log(data); // Data to be POSTed to API

            fetch(`${API_URL}/create_insurance?insurance_type=flight_delay`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((json) => {
                this.setState({ loading: false }); // Stop loading spinner
                this.setState({
                  formStatus: "success",
                  formMessage: "Insurance created!",
                });

                console.log(json);
                // <Link to="/insurance"></Link>
              });
          }
        })
        .on("error", (error) => {
          console.log(error);
          this.setState({ loading: false }); // Stop loading spinner
          this.setState({ formStatus: "error", formMessage: error });
        });
    };

    if (window.ethereum) {
      return (
        <Button type="primary" onClick={deploySmartFlightInsurance}>
          Create Flight Insurance
        </Button>
      );
    }
    return (
      <Button type="primary" disabled>
        You do not have MetaMask installed.
      </Button>
    );
  };

  render() {
    return (
      <>
        <Layout className="layout">
          <Spin spinning={this.state.loading} tip="Loading..." size="large">
            <Content style={{ padding: "0 50px", height: "100vh" }}>
              <h1 style={{ marginTop: 10 }}>Create Flight Insurance ✈️</h1>
              <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
              >

                {this.state.formMessage ? (
                  <>
                  <Alert message={this.state.formStatus, this.state.formMessage} type="success" showIcon />

                    {/* {this.state.formStatus}, {this.state.formMessage} */}
                  </>
                ) : (
                    <></>
                  )}
                <Form.Item label="Flight Number">
                  <Input name="flightCode" onChange={this.handleChange} />
                </Form.Item>

                <Form.Item label="Flight Details">
                  <Tag color="green" onClick={this.showModal}>Show Flight Details</Tag>
                  <Modal
                    title="Flight details"
                    visible={this.state.visible}
                    footer={null}
                    closable={true}
                    onCancel={this.handleCancel}
                  >
                    <Card border="true" size="small" >
                      <Form.Item label="Date of Departure">31/12/2020</Form.Item>
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
                    defaultValue={0.0001} 
                    min={0.0001} 
                    max={1}
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
                    placeholder="calculate payout coverage"
                    enterButton="Calculate"
                    onSearch={this.calculatePayout}
                    suffix="ETH"
                  />
                </Form.Item>

                <Form.Item>
                  <this.DeployContractButton />
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

export default CreateFlight;
