import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "antd/dist/antd.css";
import { Layout, Form, Input, Button, Card, InputNumber, Modal } from "antd";
import FlightInsurance from "../../blockchain/abis/FlightInsurance.json";
import { API_URL } from "../../utils/utils";

const { Content, Footer } = Layout;

const { TextArea } = Input;

const initialFormData = Object.freeze({
  flightCode: "SQ306",
  flightDate: "2020-11-30",
  premium: 0.0001,
});

function Insurance() {
  // class createFlight extends React.Component {
  const [visible, setVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(0x00);
  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState(null);
  // state = {
  //   visible = false,
  //   currentAddress = "0x00",
  //   formData = initialFormData,
  //   formStatus = null,
  // }

  let tempFlightCode = "";

  const handleChange = (e) => {
    // handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    tempFlightCode = e.target.value;
  };

  const web3 = new Web3(Web3.givenProvider);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable().then((account) => {
        const defaultAccount = account[0];
        web3.eth.defaultAccount = defaultAccount;
        setCurrentAddress(defaultAccount);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function DeployContractButton() {
    const deploySmartFlightInsurance = () => {
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
          value: web3.utils.toWei(formData.premium.toString(), "ether"),
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("Success!");

          if (confirmationNumber === 0) {
            console.log(receipt);
            const data = {
              contract_address: receipt.contractAddress,
              flight_no: formData.flightCode,
              flight_date: formData.flightDate,
              insured_wallet_addr: currentAddress,
              premium_amount: formData.premium,
              coverage_amount: 0,
            };

            fetch(`${API_URL}/create_insurance`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((json) => {
                setFormStatus(json);
                console.log(json);
              });
          }
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
  }

  return (
    // render(){
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <h1 style={{ marginTop: 10 }}>Create Flight Insurance ✈️</h1>
          <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 8 }}
            layout="horizontal"
          >
            <Form.Item label="Flight Number">
              <Input name="flightCode" onChange={handleChange} />
            </Form.Item>

            <Form.Item label="Flight Details">
              {/* <Card border="true" size="small">
                <Form.Item label="Date of Departure">31/12/2020</Form.Item>
                <Form.Item label="From">Singapore</Form.Item>
                <Form.Item label="To">Hong Kong</Form.Item>
              </Card> */}
            </Form.Item>

            {/* <Form.Item label="Pax">
                                <InputNumber
                                    defaultValue={1}
                                    min={1}
                                />
                            </Form.Item> */}

            <Form.Item label="Premium">
              <Input
                name="premium"
                defaultValue={0.0001}
                min={0.0001}
                onChange={handleChange}
                suffix="ETH"
              />
            </Form.Item>

            <Form.Item label="Ratio">
              <Input defaultValue={0.0001} min={0.0001} max={1} />
            </Form.Item>

            <Form.Item label="Payout Coverage">
              <Input defaultValue={0} min={0} suffix="ETH" />
            </Form.Item>

            <Form.Item>
              <DeployContractButton />
            </Form.Item>
          </Form>
          <Modal
            title="⚠️ Proceed Payment"
            visible={visible}
            // onOk={this.handleOk}
            // onCancel={this.handleCancel}
          >
            <p>
              You are about to make a payment of $2000 from your wallet
              (0xfeB87197aBd18dDaBD28B58b205936dfB4569B17)
            </p>
            <p>Do you want to proceed?</p>
          </Modal>
        </Content>
        <Footer />
      </Layout>
    </>
  );
  // }
}

export default Insurance;
