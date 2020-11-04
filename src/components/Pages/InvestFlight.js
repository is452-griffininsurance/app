import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "antd/dist/antd.css";
import { Layout, Form, Input, Button, Card, InputNumber, Progress, Tag, Spin } from "antd";
import { useParams } from "react-router-dom";
import FlightInsurance from "../../blockchain/abis/FlightInsurance.json";
import { API_URL } from "../../utils/utils";

import { getInsuranceByID } from '../api.js'

const { Content, Footer } = Layout;

const initialFormData = Object.freeze({
  insure_amount: 0.0001,
});

// window.onload = function() {
//   try{
//     var url_string = (window.location.href);
//     console.log(url_string)
//     var url = new URL(url_string)
//     var id = url.searchParams.get("id");
//     console.log(id)
//   }
//   catch (err){
//     console.log(err)
//   }
// };


const web3 = new Web3(Web3.givenProvider);
class InvestFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      currentAddress: "0x00",
      formData: initialFormData,
      formStatus: null,
      loading: false,
      contractDetails: [],
    };
  }

  async componentWillMount(){
    this.getTID();
  }

  async loadDBdata(){
    let data = await getInsuranceByID(this.state.id)
    console.log(data)
    this.setState({
      contractDetails : data.insurance,
    });
    console.log(this.state.contractDetails)
  }

  getTID = () => {
    var url_string = (window.location.href);
    var url = new URL(url_string);
    var pathname = url.pathname;
    console.log(pathname)
    var tid = pathname.slice(14,);
    this.setState({ id: tid });
    console.log(this.state.id);

    this.loadDBdata();
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
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  InsureButton = () => {
    const { formData, currentAddress, contractDetails, formStatus } = this.state;
    const insureFlightInsurance = () => {
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
          this.setState({ loading: false});
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
                this.setState({ loading: false});
                this.setState({
                  formStatus: "success",
                  formMessage: "Insured!"
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
        <Spin spinning = {this.state.loading} tip="Loading..." size="large">
          <Content style={{ padding: "0 50px", height: "100vh" }}>
            <h1 style={{ marginTop: 10 }}>Invest in <Tag>{this.state.id}</Tag> ✈️</h1>
            <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 8 }}
              layout="horizontal"
            >
              <Form.Item label="Percentage insured">
                <Progress percent={this.state.contractDetails.percent_insured} status="active" />
              </Form.Item>

              <Form.Item label="Flight Number">
                <Input value={this.state.contractDetails?.flight_no} disabled />
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

              <Form.Item label="Premium Paid">
                {/* this is how much money they will get, so it should be calculated */}
                <Input
                  value={this.state.contractDetails?.premium_amount}
                  disable
                />
              </Form.Item>

              <Form.Item label="Ratio">
                <Input defaultValue={0} type="number" min={1} />
              </Form.Item>

              <Form.Item label="Insure Amount">
                {/* how much investors wanna cover */}
                <Input
                  name="insure_amount"
                  defaultValue={0.0001}
                  type="number"
                  min={0.0001}
                  onChange={this.handleChange}
                />
              </Form.Item>

              <Form.Item>
                <this.InsureButton />
                <Button type="primary" danger>
                  Report
                </Button>
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
