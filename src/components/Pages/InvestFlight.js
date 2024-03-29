import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "antd/dist/antd.css";
import {
  Layout,
  Form,
  Input,
  Button,
  Card,
  Progress,
  Tag,
  Spin,
  Space,
  Alert,
} from "antd";
import FlightInsurance from "../../blockchain/abis/FlightInsurance.json";
import { API_URL } from "../../utils/utils";

import { getInsuranceByID } from "../api.js";

const { Content, Footer } = Layout;

const { Search } = Input;

const initialFormData = Object.freeze({
  insure_amount: 0.0001,
});

const web3 = new Web3(Web3.givenProvider);
class InvestFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      currentAddress: "0x00",
      formData: initialFormData,
      formStatus: null,
      loading: false,
      contractDetails: [],
    };
  }

  async componentWillMount() {
    await this.loadDBdata();
  }

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

  async loadDBdata() {
    const data = await getInsuranceByID(this.props.match.params.id);
    console.log(data);
    this.setState({
      contractDetails: data.insurance,
      id: data.insurance._id,
      minInsuredAmount: data.insurance.min_insured_amount,
    });
    console.log(this.state.id);
    console.log(this.state.contractDetails);
  }

  calculateEarning = (e) => {
    const inputInsured = parseFloat(
      document.getElementById("insure_amount").value
    );
    document.getElementById("premium_earned").value = inputInsured * 10;
  };

  InsureButton = () => {
    const {
      formData,
      currentAddress,
      contractDetails,
      formStatus,
    } = this.state;
    const insureFlightInsurance = () => {
      console.log("FormData", formData);
      console.log(contractDetails.contract_address);
      this.setState({ loading: true });
      const flightInsurance = new web3.eth.Contract(
        FlightInsurance.abi,
        contractDetails.contract_address
      );

      flightInsurance.methods
        .insure()
        .send({
          from: currentAddress,
          value: web3.utils.toWei(formData.insure_amount.toString(), "ether"),
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("Insure success!");
          this.setState({ loading: false });
          if (confirmationNumber === 0) {
            console.log(receipt);

            const data = {
              wallet_addr: currentAddress,
              insuring_amount: formData.insure_amount,
            };

            fetch(
              `${API_URL}/add_insurer?contract_address=${contractDetails.contract_address}`,
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
                this.setState({ loading: false });
                this.setState({
                  formStatus: "success",
                  formMessage: "Insured!",
                });
                // setFormStatus(json);
                console.log(json);
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
        <Button type="primary" onClick={insureFlightInsurance}>
          Insure
        </Button>
      );
    }
    return (
      <Button type="primary" disabled>
        You do not have MetaMask installed.
      </Button>
    );
  };

  // function InvestFlight() {
  //   const { id } = useParams();
  //   const [contractDetails, setContractDetails] = useState(null);
  //   const [currentAddress, setCurrentAddress] = useState(0x00);
  //   const [formData, setFormData] = useState(initialFormData);
  //   const [formStatus, setFormStatus] = useState(null);

  //   const handleChange = (e) => {
  //     console.log(e.target.name, e.target.value);
  //     setFormData({
  //       ...formData,
  //       // Trimming any whitespace
  //       [e.target.name]: e.target.value.trim(),
  //     });
  //   };

  //   const web3 = new Web3(Web3.givenProvider);
  //   useEffect(() => {
  //     window.ethereum.enable().then((account) => {
  //       const defaultAccount = account[0];
  //       web3.eth.defaultAccount = defaultAccount;
  //       setCurrentAddress(defaultAccount); // User's wallet address
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   useEffect(() => {
  //     fetch(`${API_URL}/get_insurance_by_id/${id}`)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setContractDetails(json?.request_record);
  //         console.log(json?.request_record);
  //       });
  //   }, [id]);

  // }
  // function InsureButton() {
  //   const insureFlightInsurance = () => {
  //     // Deploying contract should be done through our backend service
  //     const flightInsurance = new web3.eth.Contract(
  //       FlightInsurance.abi,
  //       contractDetails.contract_address
  //     );

  //     flightInsurance.methods
  //       .insure()
  //       .send({
  //         from: currentAddress,
  //         value: web3.utils.toWei(formData.insure_amount.toString(), "ether"),
  //       })
  //       .on("confirmation", (confirmationNumber, receipt) => {
  //         console.log("Insure success!");
  //         if (confirmationNumber === 0) {
  //           console.log(receipt);

  //           const data = {
  //             wallet_addr: currentAddress,
  //             insuring_amount: formData.insure_amount,
  //           };

  //           fetch(
  //             `${API_URL}/add_insurer/${contractDetails.contract_address}`,
  //             {
  //               method: "POST",
  //               headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify(data),
  //             }
  //           )
  //             .then((response) => response.json())
  //             .then((json) => {
  //               setFormStatus(json);
  //               console.log(json);
  //             });
  //         }
  //       });
  //   };
  //   return (
  //     <Button type="primary" onClick={insureFlightInsurance}>
  //       Insure
  //     </Button>
  //   );
  // };

  render() {
    return (
      <>
        <Layout className="layout">
          <Spin spinning={this.state.loading} tip="Loading..." size="large">
            <Content style={{ padding: "0 50px", height: "100vh" }}>
              <h1 style={{ marginTop: 10 }}>
                Invest in{" "}
                <Tag>
                  <a
                    href={`http://rinkeby.etherscan.io/address/${this.state.contractDetails?.contract_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {this.state.contractDetails?.contract_address}
                  </a>
                </Tag>{" "}
                ✈️
              </h1>
              <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
              >
                {this.state.formMessage ? (
                  <>
                    <Alert
                      message={this.state.formMessage}
                      description={
                        <a href="https://is452.cloud/flight">
                          Go back to flight
                        </a>
                      }
                      type="success"
                      showIcon
                    />

                    {/* {this.state.formStatus}, {this.state.formMessage} */}
                  </>
                ) : (
                  <></>
                )}
                <Form.Item label="Percentage insured">
                  <Progress
                    percent={(
                      this.state.contractDetails.percent_insured * 100
                    ).toFixed(2)}
                    status="active"
                  />
                </Form.Item>

                <Form.Item label="Flight Number">
                  <Input
                    value={this.state.contractDetails?.flight_no}
                    disabled
                  />
                </Form.Item>

                <Form.Item label="Flight Details">
                  <Card border="true" size="small">
                    <Form.Item label="Date of Departure">
                      {this.state.contractDetails?.flight_date}
                    </Form.Item>
                    <Form.Item label="From">Singapore</Form.Item>
                    <Form.Item label="To">Hong Kong</Form.Item>
                  </Card>
                </Form.Item>

                <Form.Item label="Insure Amount">
                  {/* how much investors wanna cover */}
                  <Input
                    name="insure_amount"
                    id="insure_amount"
                    defaultValue={0}
                    onChange={this.handleChange}
                    suffix="ETH"
                  />
                  <Space size="small">
                    <Tag color="#87d068">Min amount to insure</Tag>
                    {this.state.contractDetails.min_insured_amount}
                    <Tag color="#f50">Max amount to insure</Tag>
                    {this.state.contractDetails.max_insured_amount}
                  </Space>
                </Form.Item>

                <Form.Item label="Premium Earned">
                  <Search
                    id="premium_earned"
                    placeholder="Calculate premium earned"
                    enterButton="Calculate"
                    onSearch={this.calculateEarning}
                    suffix="ETH"
                  />
                </Form.Item>

                <Form.Item>
                  <Space size="small">
                    <this.InsureButton />
                    <Button type="primary" danger>
                      Report
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Content>
          </Spin>
          <Footer />
        </Layout>
      </>
    );
  }
}

export default InvestFlight;
