import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "antd/dist/antd.css";
import { Layout, Form, Input, Button, Card, InputNumber, Progress } from "antd";
import { useParams } from "react-router-dom";
import SmartInsurance from "../../blockchain/abis/SmartInsurance.json";
import { API_URL } from "../../utils/utils";

const { Content, Footer } = Layout;

const initialFormData = Object.freeze({
  insure_amount: 0.0001,
});

function InvestFlight() {
  const { id } = useParams();
  const [contractDetails, setContractDetails] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(0x00);
  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const web3 = new Web3(Web3.givenProvider);
  useEffect(() => {
    window.ethereum.enable().then((account) => {
      const defaultAccount = account[0];
      web3.eth.defaultAccount = defaultAccount;
      setCurrentAddress(defaultAccount); // User's wallet address
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/get_insurance_by_id/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setContractDetails(json?.request_record);
        console.log(json?.request_record);
      });
  }, [id]);

  function InsureButton() {
    const insureFlightInsurance = () => {
      // Deploying contract should be done through our backend service
      const smartInsurance = new web3.eth.Contract(
        SmartInsurance.abi,
        contractDetails.contract_address
      );

      smartInsurance.methods["insure"]()
        .send({
          from: currentAddress,
          value: web3.utils.toWei(formData.insure_amount.toString(), "ether"),
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("Insure success!");
          if (confirmationNumber === 0) {
            console.log(receipt);

            const data = {
              wallet_addr: currentAddress,
              insuring_amount: formData.insure_amount,
            };

            fetch(
              `${API_URL}/add_insurer/${contractDetails.contract_address}`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            )
              .then((response) => response.json())
              .then((json) => {
                setFormStatus(json);
                console.log(json);
              });
          }
        });
    };
    return (
      <Button type="primary" onClick={insureFlightInsurance}>
        Insure
      </Button>
    );
  }

  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
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
              <Input value={contractDetails?.flight_no} disabled />
            </Form.Item>

            <Form.Item label="Flight Details">
              <Card border="true" size="small">
                <Form.Item label="Date of Departure">
                  {contractDetails?.flight_date}
                </Form.Item>
                <Form.Item label="From">Singapore</Form.Item>
                <Form.Item label="To">Hong Kong</Form.Item>
              </Card>
            </Form.Item>

            <Form.Item label="Premium Paid">
              {/* this is how much money they will get, so it should be calculated */}
              <InputNumber
                value={contractDetails?.premium_amount}
                disabled
                min={0}
                formatter={(value) =>
                  `${value} ETH`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item label="Ratio">
              <InputNumber defaultValue={0} min={1} />
            </Form.Item>

            <Form.Item label="Insure Amount">
              {/* how much investors wanna cover */}
              <Input
                name="insure_amount"
                defaultValue={0.0001}
                type="number"
                min={0.0001}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <InsureButton />
              <Button type="primary" danger>
                Report
              </Button>
            </Form.Item>
          </Form>
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default InvestFlight;
