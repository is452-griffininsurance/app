import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Card, Col, Row, Avatar, Typography } from "antd";
import TransactionTable from "./TransactionTable";
import InsuranceOwnedTable from "./insuranceOwnedTable";
import InsuranceInvestedTable from "./insuranceInvestedTable";
import { getAllTransactions, getAllInsurance } from "../../api";

const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const gridStyleInsuranceTable = {
  textAlign: "center",
  height: "100%",
};

const gridStyleTransactionTable = {
  width: "100%",
  textAlign: "center",
};

const iconCardStyle = {
  ontSize: "15px",
  title: "20px",
};

const avatarStyle = {
  height: "70px",
  width: "70px",
};

class Home extends Component {
  state = {
    numTransactionData: 0,
    numInsuredData: 0,
    numInsuringData: 0,
  };

  async componentWillMount() {
    await this.loadDBData();
  }

  async loadDBData() {
    const transactionData = await getAllTransactions();
    const numTransaction =
      transactionData.paying_transactions.length +
      transactionData.receiving_transactions.length;
    const insuranceData = await getAllInsurance();
    this.setState({
      numTransactionData: numTransaction,
      numInsuredData: insuranceData.insured_insurances.length,
      numInsuringData: insuranceData.insuring_insurances.length,
    });
  }

  render() {
    return (
      <>
        <Layout className="layout">
          <Content style={{ padding: "0 50px" }}>
            <h1 style={{ marginTop: 10 }}>
              Welcome, {localStorage.getItem("username")}!
            </h1>
            <div className="site-card-wrapper">
              <Row
                gutter={5}
                style={{ marginBottom: 16, width: "100%", display: "justify" }}
              >
                <Col style={{ width: "33.5%", textAlign: "center" }}>
                  <Card style={iconCardStyle} hoverable="true">
                    <Meta
                      avatar={
                        <Avatar
                          style={avatarStyle}
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGNzA2OTsiIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZFQzk4MjsiIGQ9Ik0yNjAuNTM5LDM2My41MTNsNTIuMDg0LTMxLjQxOGMxMi4wNjUtNy4yODcsMTguNTE2LDYuNjksMTEuMjI5LDEwLjc1MWwtNDAuNzM1LDIyLjQ1OA0KCUwyNjAuNTM5LDM2My41MTN6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZEMTkwOyIgZD0iTTI4My4zNTYsMzYwLjY0Nmw1NS45MDctMzQuNDA0YzEzLjE0LTguMTIzLDIwLjA2OSw4LjM2MiwxMi45MDIsMTIuNTQzbC0zOC4zNDYsMjIuNDU4DQoJCWwtMzAuNDYyLTAuNDc4VjM2MC42NDZ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRDE5MDsiIGQ9Ik0xNDguMjQ4LDM3Mi41OTJsLTEwNi4wNzksMjQuMjVjLTE2LjAwNy0yNC4zNy0yOC4wNzMtNTEuNjA2LTM1LjEyMS04MC43NTRsMTMyLjQ4LTguNzINCgkJYzIxLjI2NC0yLjk4Niw0MC44NTUtMi44NjcsNDkuNTc1LDEuOTExYzE1LjQxLDguNjAxLDEzLjczOCwyNy4zNTYsNDguOTc4LDM3LjE1Mmw1MC4yOTIsOC43Mmw4MC43NTQtMTkuODMNCgkJYzE0LjgxMy0yLjYyOCwxNy43OTksMTMuOTc3LDguMDA0LDE3LjkxOWwtMTA4LjQ2OSwzOC40NjZDMjU0LjA4OSwzOTYuODQyLDIxOC45NjgsMzg1LjAxNSwxNDguMjQ4LDM3Mi41OTJ6Ii8+DQo8L2c+DQo8cGF0aCBzdHlsZT0iZmlsbDojRjBCOTdEOyIgZD0iTTMwNC4zODEsMzUxLjIwOWM1LjQ5NSw1Ljg1My01LjQ5NSw5LjA3OS0yMS4xNDQsMTIuNDI0Yy0xMS4yMjksMi4zODktMjYuMjgxLDUuMjU2LTMzLjU2OCw3LjA0OA0KCWMtMTQuMDk2LDAuNDc4LTUwLjI5Mi04LjEyMy03NS43MzctMTcuNDQxYzEzLjAyMS0wLjIzOSw2Ny40OTQsMTYuMDA3LDc2LjA5NSwxNC4zMzVjOC42MDEtMS42NzIsNDkuODE0LTEyLjU0Myw1Mi41NjItMTQuMDk2DQoJQzMwNS4zMzYsMzUxLjkyNSwzMDQuMDIyLDM1Mi4xNjQsMzA0LjM4MSwzNTEuMjA5eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzZCN0Y5RTsiIGQ9Ik05Mi44MTksMzAwLjU1OGwxNC4yMTYsMTA1LjI0M2wtNTEuNzI2LDkuMDc5Yy0yNC40ODktMzAuODItNDEuOTMtNjcuNDk0LTUwLjA1My0xMDcuNTEzDQoJTDkyLjgxOSwzMDAuNTU4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHBvaW50cz0iMTExLjkzMywzMDEuMjc1IDEyNS43OSwzOTkuOTQ4IDEwNi42NzcsNDAyLjQ1NiA5Mi44MTksMzAzLjY2NCAiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM4NTk3QjE7IiBkPSJNOTcuNzE3LDM5MS40NjZjMC40NzgsMy45NDItMi4xNSw3LjUyNi01Ljk3Myw4LjAwNHMtNy40MDYtMi4yNy03Ljg4NC02LjIxMg0KCWMtMC40NzgtMy45NDIsMi4xNS03LjUyNiw1Ljk3My04LjAwNEM5My42NTYsMzg0Ljc3Niw5Ny4yMzksMzg3LjUyNCw5Ny43MTcsMzkxLjQ2NnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkQxOTA7IiBkPSJNMTc1Ljg0MywzMDUuODE0YzI2LjQtNC4xODEsNDMuOTYxLDExLjM0OSw1Ny4yMjEsMjkuOTg0bDI0LjAxMSw1LjYxNQ0KCWMwLDAsMjIuNDU4LTQuODk4LDM0LjUyNC0xLjE5NWMxMS45NDYsMy43MDMsMTUuNjQ5LDEzLjM3OSwxMC45OSwxNi4wMDdjLTQuNjU5LDIuNjI4LTQzLjk2MSw5LjU1Ny01Mi41NjIsMTEuMjI5DQoJYy04LjcyLDEuNjcyLTU3LjY5OS04LjQ4Mi03NS45NzYtMTQuMjE2Yy0xOC4yNzctNS42MTUtMjkuMDI4LTQwLjg1NSwxLjc5Mi00Ny41NDVWMzA1LjgxNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkYxREY7IiBkPSJNMzY4Ljg4OCwzNTYuMTA2bDEyLjc4Mi00LjE4MWMxLjU1My0wLjQ3OCwwLjIzOS00LjUzOS0xLjc5Mi00LjUzOQ0KCWMtMi4wMzEsMC0xMy42MTgsMi44NjctMTMuNjE4LDIuODY3QzM2Ny42OTQsMzUxLjgwNiwzNjkuMjQ3LDM1NC4wNzYsMzY4Ljg4OCwzNTYuMTA2eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yODUuMzg3LDM1OS4zMzJsMTYuMjQ2LTMuNTg0YzEuMzE0LTAuMjM5LDAuMjM5LTYuNTctMi44NjctNy44ODQNCgljLTMuMTA2LTEuMTk1LTE2LjYwNSwxLjU1My0xNi42MDUsMS41NTNjMS4wNzUsMi4yNywyLjg2Nyw2LjMzMSwzLjEwNiw5Ljc5NkwyODUuMzg3LDM1OS4zMzJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEMTkwOyIgZD0iTTI2My4wNDgsMjAxLjA0OWwzNS4zNi0yLjc0OGM1LjAxNy0wLjM1OCwxOC4zOTctOC43MiwxOC4zOTctOC43MmwtMTIuNzgyLTIxLjUwM2wtMzIuOTcxLTMuOTQyDQoJbC0yNS40NDUsMjMuNDE0bC05Ljc5NiwyMC4wNjljLTUuODUzLDEwLjUxMi0yNS4wODYsOC40ODItMjAuNDI3LTQuODk4bDExLjExLTMzLjU2OGMwLDAsMjcuODM0LTI5Ljk4NCwzOC4xMDctMzQuMTY1DQoJYzEwLjI3My00LjE4MSw4Mi41NDYtNy43NjUsODIuNTQ2LTcuNzY1czU5LjEzMiwzMi4yNTQsODEuMTEyLDQ2LjIzMWw2OS43NjQtMC45NTZjNi41NywxOS4xMTMsMTAuOTksMzkuMTgyLDEyLjkwMiw1OS45NjgNCglsLTg3LjkyMi0yLjAzMWMwLDAtNTUuOTA3LDEwLjg3MS03NC45MDEsOC4xMjNjLTE5LjExMy0yLjc0OC00NS41MTQtMTAuOTktNDUuNTE0LTEwLjk5cy0zMy4zMjksMC41OTctNDIuNzY2LTMuNzAzDQoJYy0xMy4zNzktNC42NTktMTIuMzA0LTIxLjYyMiwzLjM0NS0yMi44MTdIMjYzLjA0OHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjE1Ljg2MiwxOTguNjZjMC41OTcsMC4yMzksMy44MjMsMS41NTMsMy44MjMsMS41NTNsLTMuMjI1LDkuNzk2YzAsMC0zLjgyMywxLjc5Mi0zLjIyNS0yLjM4OQ0KCWMwLjU5Ny00LjE4MSwyLjYyOC05LjA3OSwyLjYyOC05LjA3OVYxOTguNjZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZFMzU2OyIgZD0iTTI3My45MTksMjAwLjU3MWMtMC4zNTgtMS41NTMtMC43MTctMy4xMDYtMS4xOTUtNC42NTljLTIuMjctNy4wNDgtNi4wOTItMTMuMzc5LTEwLjk5LTE4LjYzNg0KCWMtOC45NTktOS40MzctMjEuNTAzLTE1LjI5MS0zNS40NzktMTUuMjkxYy0yNi45OTgsMC00OC44NTksMjEuODYxLTQ4Ljg1OSw0OC44NTlzMjEuODYxLDQ4Ljg1OSw0OC44NTksNDguODU5DQoJYzE2LjcyNCwwLDMxLjUzNy04LjM2Miw0MC4yNTgtMjEuMjY0YzMuMzQ1LTQuNzc4LDUuNzM0LTEwLjE1NCw3LjE2OC0xNi4wMDdjMC4zNTgtMS40MzQsMC41OTctMi44NjcsMC44MzYtNC4zMDENCgljMC4zNTgtMi4zODksMC41OTctNC44OTgsMC41OTctNy40MDZjMC0zLjU4NC0wLjM1OC03LjA0OC0xLjA3NS0xMC4zOTNsMCwwTDI3My45MTksMjAwLjU3MXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQ0QzNEU7IiBkPSJNMjcxLjY0OSwyMDEuMDQ5Yy0wLjM1OC0xLjQzNC0wLjcxNy0yLjk4Ni0xLjE5NS00LjQyYy0yLjE1LTYuNjktNS43MzQtMTIuNjYzLTEwLjUxMi0xNy42OA0KCWMtOC40ODItOC45NTktMjAuNTQ3LTE0LjU3NC0zMy44MDctMTQuNTc0Yy0yNS42ODQsMC00Ni41ODksMjAuOTA1LTQ2LjU4OSw0Ni41ODlzMjAuOTA1LDQ2LjU4OSw0Ni41ODksNDYuNTg5DQoJYzE1Ljg4OCwwLDI5Ljk4NC04LjAwNCwzOC4zNDYtMjAuMTg5YzMuMTA2LTQuNTM5LDUuNDk1LTkuNjc2LDYuODA5LTE1LjI5MWMwLjM1OC0xLjMxNCwwLjU5Ny0yLjc0OCwwLjgzNi00LjE4MQ0KCWMwLjM1OC0yLjI3LDAuNDc4LTQuNjU5LDAuNDc4LTcuMDQ4YzAtMy40NjQtMC4zNTgtNi42OS0xLjA3NS05LjkxNWwwLDBMMjcxLjY0OSwyMDEuMDQ5eiIvPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRTM1NjsiIGQ9Ik0yMjYuMTM1LDE3NC41MjljLTIwLjA2OSwwLTM2LjQzNSwxNi4yNDYtMzYuNDM1LDM2LjQzNWMwLDIwLjA2OSwxNi4zNjYsMzYuNDM1LDM2LjQzNSwzNi40MzUNCgkJczM2LjQzNS0xNi4zNjYsMzYuNDM1LTM2LjQzNVMyNDYuMzI0LDE3NC41MjksMjI2LjEzNSwxNzQuNTI5TDIyNi4xMzUsMTc0LjUyOXogTTIyNi4xMzUsMTc5LjA2OQ0KCQljMTcuNTYsMCwzMS44OTUsMTQuMzM1LDMxLjg5NSwzMS44OTVzLTE0LjMzNSwzMS44OTUtMzEuODk1LDMxLjg5NXMtMzEuODk1LTE0LjMzNS0zMS44OTUtMzEuODk1UzIwOC41NzUsMTc5LjA2OSwyMjYuMTM1LDE3OS4wNjkNCgkJeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkUzNTY7IiBkPSJNMjIzLjI2OCwyMzMuMzAzdi01LjEzN2MtMy43MDMtMC4xMTktNy4xNjgtMS4xOTUtOS4zMTgtMi4zODlsMS42NzItNi40NTENCgkJYzIuMjcsMS4zMTQsNS40OTUsMi4zODksOS4wNzksMi4zODljMy4xMDYsMCw1LjI1Ni0xLjE5NSw1LjI1Ni0zLjM0NWMwLTIuMDMxLTEuNzkyLTMuMzQ1LTUuNzM0LTQuNzc4DQoJCWMtNS44NTMtMS45MTEtOS43OTYtNC42NTktOS43OTYtMTAuMDM1YzAtNC43NzgsMy4zNDUtOC42MDEsOS4xOTgtOS42NzZ2LTUuMTM3aDUuMzc2djQuNzc4YzMuNzAzLDAuMTE5LDYuMDkyLDAuOTU2LDcuODg0LDEuNzkyDQoJCWwtMS41NTMsNi4yMTJjLTEuNDM0LTAuNTk3LTMuOTQyLTEuOTExLTcuODg0LTEuOTExYy0zLjU4NCwwLTQuNjU5LDEuNTUzLTQuNjU5LDMuMTA2YzAsMS43OTIsMS45MTEsMi45ODYsNi41Nyw0LjY1OQ0KCQljNi40NTEsMi4yNyw5LjA3OSw1LjI1Niw5LjA3OSwxMC4yNzNjMCw0Ljg5OC0zLjQ2NCw4Ljk1OS05LjY3NiwxMC4xNTR2NS42MTVoLTUuMzc2TDIyMy4yNjgsMjMzLjMwM3oiLz4NCjwvZz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkQxOTA7IiBkPSJNMjYzLjA0OCwyMDEuMDQ5YzE1LjY0OS0xLjE5NSwzMC4yMjMtMi41MDksMzUuMzYtMi43NDhjNS4wMTctMC4zNTgsMTguMzk3LTguNzIsMTguMzk3LTguNzINCglzMzQuNzYyLDE0LjMzNSwzMi40OTMsMjguNzlzLTUuMzc2LDE0LjkzMi05LjMxOCwxOC44NzRjLTE3LjY4LTMuNDY0LTM3LjUxLTkuNTU3LTM3LjUxLTkuNTU3cy0zMy4zMjksMC41OTctNDIuNzY2LTMuNzAzDQoJYy0xMy4zNzktNC42NTktMTIuMzA0LTIxLjYyMiwzLjM0NS0yMi44MTdWMjAxLjA0OXoiLz4NCjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBwb2ludHM9IjQzMS44NDMsMTU5Ljk1NSA0MzcuNjk3LDI1Mi42NTUgNDYyLjE4NiwyNTEuMTAyIDQ1Ni4zMzIsMTU4LjQwMiAiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM2QjdGOUU7IiBkPSJNNDUyLjAzMiwxNDguODQ2bDcuMTY4LDExMi4xNzJMNTEyLDI2MC4xODFjMC0xLjQzNCwwLTIuODY3LDAtNC4zMDENCgljMC0zOS40MjEtOC45NTktNzYuNjkyLTI0Ljg0Ny0xMTAuMTQxbC0zNS4yNCwyLjk4Nkw0NTIuMDMyLDE0OC44NDZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI1Mi44OTQsMjE0LjQyOGwxNi45NjMtMC40Nzh2MTAuMjczYzAsMC0xNC42OTMsMC41OTctMTcuNDQxLTEuNjcyDQoJYy0yLjc0OC0yLjM4OS0xLjU1My03LjI4NywwLjQ3OC04LjAwNFYyMTQuNDI4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6Izg1OTdCMTsiIGQ9Ik00ODMuMDkxLDI0NS42MDdjMC40NzgsMy45NDItMi4xNSw3LjUyNi01Ljk3Myw4LjAwNGMtMy44MjMsMC40NzgtNy40MDYtMi4yNy03Ljg4NC02LjIxMg0KCWMtMC40NzgtMy45NDIsMi4xNS03LjUyNiw1Ljk3My04LjAwNEM0NzkuMDI5LDIzOC45MTcsNDgyLjYxMywyNDEuNjY1LDQ4My4wOTEsMjQ1LjYwN3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                        />
                      }
                      description="Transactions made"
                      title={
                        <Title level={3}>{this.state.numTransactionData}</Title>
                      }
                    />
                  </Card>
                </Col>
                <Col style={{ width: "33.5%", textAlign: "center" }}>
                  <Card style={iconCardStyle} hoverable="true">
                    <Meta
                      avatar={
                        <Avatar
                          style={avatarStyle}
                          src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGc+PGc+PGc+PGc+PGc+PGc+PGc+PGc+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiBmaWxsPSIjZmZjZTAwIiByPSIyNTYiLz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjxwYXRoIGQ9Im0xNzAuNzcxIDM4Mi43MzIgMTI2LjAzNCAxMjYuMDM0YzEyMS45OS0xOS41NDEgMjE1LjE5NS0xMjUuMjY5IDIxNS4xOTUtMjUyLjc2NiAwLTEyLjcyMi0uOTI4LTI1LjIyOC0yLjcyLTM3LjQ1MmwtMTA2LjA5NS0xMDYuMDk1eiIgZmlsbD0iI2ZmYTMwMCIvPjxnPjxwYXRoIGQ9Im0zNDEuNDY1IDM2My4wMzktODUuNDcgNzAuOTYxLTg1LjQ2MS03MC45NjFjLTI5LjY4OS0yNC42NTEtNDYuNzE5LTYwLjI2My00Ni43MTktOTcuNjk4di0xNDIuMzA0bDEzMi4xOC00Ny4wMzcgMTMyLjE4OSA0Ny4wMzZ2MTQyLjMwNGMuMDAxIDM3LjQzNi0xNy4wMjkgNzMuMDQ4LTQ2LjcxOSA5Ny42OTl6IiBmaWxsPSIjNzU4NGYyIi8+PHBhdGggZD0ibTI1NS45OTUgNzZ2LjAwNSAzNTcuOTgzLjAxMmw4NS40Ny03MC45NjFjMjkuNjg5LTI0LjY1MSA0Ni43MTktNjAuMjYzIDQ2LjcxOS05Ny42OTh2LTE0Mi4zMDR6IiBmaWxsPSIjNjA2YWVhIi8+PHBhdGggZD0ibTI1NS45OTUgNDUzLjQ5Ny05NS4wNDMtNzguOTE3Yy0zMy4xMzQtMjcuNTExLTUyLjEzNy02Ny4zMjctNTIuMTM3LTEwOS4yMzl2LTE1Mi44ODhsMTQ3LjE4LTUyLjM3NCAxNDcuMTg5IDUyLjM3NHYxNTIuODg4YzAgNDEuOTEyLTE5LjAwMyA4MS43MjgtNTIuMTM3IDEwOS4yMzl6bS0xMTcuMTgtMzE5Ljg3NnYxMzEuNzJjMCAzMi45NjEgMTUuMDU0IDY0LjM2NSA0MS4zMDEgODYuMTU4bDc1Ljg3OSA2My4wMDUgNzUuODg4LTYzLjAwNSA5LjU4MiAxMS41NDEtOS41ODItMTEuNTQxYzI2LjI0OC0yMS43OTMgNDEuMzAxLTUzLjE5NiA0MS4zMDEtODYuMTU4di0xMzEuNzJsLTExNy4xODktNDEuN3oiIGZpbGw9IiM0ODU1YjciLz48cGF0aCBkPSJtMjU1Ljk5NSA2MC4wNzl2LjAwNSAzMS44NDMtLjAwNWwxMTcuMTg5IDQxLjY5OXYxMzEuNzJjMCAzMi45NjEtMTUuMDU0IDY0LjM2NS00MS4zMDEgODYuMTU4bDkuNTgyIDExLjU0MS05LjU4Mi0xMS41NDEtNzUuODg4IDYzLjAwNXYtLjAxMiAzOC45OTMuMDEybDk1LjA1Mi03OC45MTdjMzMuMTM0LTI3LjUxMSA1Mi4xMzctNjcuMzI3IDUyLjEzNy0xMDkuMjM5di0xNTIuODg4eiIgZmlsbD0iIzI3NDg4ZiIvPjwvZz48Zz48Zz48cGF0aCBkPSJtMTc3LjM4MiAyMjIuNzcxYzAtMjIuNTAzIDE4LjI0My00MC43NDYgNDAuNzQ2LTQwLjc0NiAxNy4xODMgMCAzMS44NzggMTAuNjIyIDM3Ljg2NyAyNS42NyA1Ljk5LTE1LjA0OCAyMC42OTMtMjUuNjcgMzcuODc3LTI1LjY3IDIyLjUwNCAwIDQwLjc0NiAxOC4yNDMgNDAuNzQ2IDQwLjc0NiAwIDU1LjczNy03OC42MjMgOTMuMjA1LTc4LjYyMyA5My4yMDVzLTc4LjYxMy00MC4xNzMtNzguNjEzLTkzLjIwNXoiIGZpbGw9IiNmZmYiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0yOTMuODcyIDE4Mi4wMjRjLTE3LjE4MyAwLTMxLjg4NyAxMC42MjItMzcuODc3IDI1LjY3LS4wMDUtLjAxMS4wMDUtLjAyMiAwLS4wMzN2MTA4LjMwN2MuMDAyLjAwMSAwIC4wMDcgMCAuMDA3czc4LjYyMy0zNy40NjggNzguNjIzLTkzLjIwNWMwLTIyLjUwMy0xOC4yNDMtNDAuNzQ2LTQwLjc0Ni00MC43NDZ6IiBmaWxsPSIjZTllZGY1Ii8+PC9nPjwvZz48L2c+PC9zdmc+"
                        />
                      }
                      title={
                        <Title level={3}>{this.state.numInsuredData}</Title>
                      }
                      description="Insurance Owned"
                    />
                  </Card>
                </Col>
                <Col style={{ width: "33%", textAlign: "center" }}>
                  <Card style={iconCardStyle} hoverable="true">
                    <Meta
                      avatar={
                        <Avatar
                          style={avatarStyle}
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojNEE3QUZGOyIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjg2NEYwOyIgZD0iTTI2Ny4xNjUsNTExLjc0M0M0MDMuMzY4LDUwNS44OTYsNTEyLDM5My42NDMsNTEyLDI1NmMwLTAuNTA4LTAuMDE2LTEuMDEyLTAuMDE5LTEuNTE5TDM1NSw5Ny41DQoJbC0yOS4xNDYsNzcuNTNsLTgyLjM2My04Mi4zNjNMMTcwLjg1LDE0N2wxMjAuMzEzLDEyMC4zMTNMMTc2LjU1Nyw0MjEuNzVMMjY3LjE2NSw1MTEuNzQzeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzAwQ0M3MTsiIGQ9Ik0zMTUuNzUsOTcuNWMtMzIuOTE1LDAtNTkuNjA4LDI2LjYxNy01OS43NDQsNTkuNUgyNTZ2LTI3Ljc1YzAtMzIuOTk5LTI2Ljc1MS01OS43NS01OS43NS01OS43NUgxNTcNCgl2MzkuMjVjMCwzMi45OTksMjYuNzUxLDU5Ljc1LDU5Ljc1LDU5Ljc1SDI0MXY5MGgzMHYtNjJoMjQuMjVjMzIuOTk5LDAsNTkuNzUtMjYuNzUxLDU5Ljc1LTU5Ljc1Vjk3LjVIMzE1Ljc1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzAwOTk1NDsiIGQ9Ik0yNTUuNTcxLDI1OC41SDI3MXYtNjJoMjQuMjVjMzIuOTk5LDAsNTkuNzUtMjYuNzUxLDU5Ljc1LTU5Ljc1Vjk3LjVoLTM5LjI1DQoJYy0zMi45MTUsMC01OS42MDgsMjYuNjE3LTU5Ljc0NCw1OS41SDI1NkwyNTUuNTcxLDI1OC41eiIvPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZERTQ2OyIgY3g9IjI1NiIgY3k9IjMzNC41IiByPSIxMTgiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkI2NEM7IiBkPSJNMjU2LDIxNi41Yy0wLjE0MywwLTAuMjg1LDAuMDA1LTAuNDI5LDAuMDA1djIzNS45ODljMC4xNDMsMCwwLjI4NSwwLjAwNSwwLjQyOSwwLjAwNQ0KCWM2NS4xNywwLDExOC01Mi44MywxMTgtMTE4UzMyMS4xNywyMTYuNSwyNTYsMjE2LjV6Ii8+DQo8Y2lyY2xlIHN0eWxlPSJmaWxsOiNGRkYwNEE7IiBjeD0iMjU2IiBjeT0iMzM0LjUiIHI9Ijg3LjI1Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZERTQ2OyIgZD0iTTI1NiwyNDcuMjVjLTAuMTQzLDAtMC4yODUsMC4wMDUtMC40MjksMC4wMDV2MTc0LjQ4OWMwLjE0MywwLjAwMSwwLjI4NSwwLjAwNSwwLjQyOSwwLjAwNQ0KCWM0OC4xODcsMCw4Ny4yNS0zOS4wNjMsODcuMjUtODcuMjVDMzQzLjI1LDI4Ni4zMTMsMzA0LjE4NywyNDcuMjUsMjU2LDI0Ny4yNXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFODlGMDA7IiBkPSJNMjk5LjM0OCwzNTYuOTE3YzAtMjAuNjMyLTE2Ljc4NS0zNy40MTctMzcuNDE3LTM3LjQxN2gtMTEuODYzYy00LjA4OSwwLTcuNDE3LTMuMzI3LTcuNDE3LTcuNDE3DQoJYzAtNC4wODksMy4zMjctNy40MTcsNy40MTctNy40MTdoNDQuMjh2LTMwSDI3MXYtMTNoLTMwdjE0LjExN2MtMTYuMjYzLDQuMDY1LTI4LjM0OCwxOC43OTUtMjguMzQ4LDM2LjI5OQ0KCWMwLDIwLjYzMiwxNi43ODUsMzcuNDE3LDM3LjQxNywzNy40MTdoMTEuODYzYzQuMDg5LDAsNy40MTcsMy4zMjcsNy40MTcsNy40MTdjMCw0LjA4OS0zLjMyNyw3LjQxNy03LjQxNyw3LjQxN2gtNDQuMjh2MzBIMjQxdjEzDQoJaDMwdi0xNC4xMTdDMjg3LjI2MywzODkuMTUyLDI5OS4zNDgsMzc0LjQyMSwyOTkuMzQ4LDM1Ni45MTd6Ii8+DQo8Zz4NCgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRTA5MTFCOyIgcG9pbnRzPSIyOTQuMzQ4LDMwNC42NjcgMjk0LjM0OCwyNzQuNjY3IDI3MSwyNzQuNjY3IDI3MSwyNjEuNjY3IDI1NS41NzEsMjYxLjY2NyAyNTUuNTcxLDMwNC42NjcgDQoJCQkiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRTA5MTFCOyIgZD0iTTI2MS45MzIsMzE5LjVoLTYuMzZ2MzBoNi4zNmM0LjA4OSwwLDcuNDE3LDMuMzI3LDcuNDE3LDcuNDE3YzAsNC4wODktMy4zMjcsNy40MTctNy40MTcsNy40MTcNCgkJaC02LjM2djQzSDI3MXYtMTQuMTE3YzE2LjI2My00LjA2NSwyOC4zNDgtMTguNzk1LDI4LjM0OC0zNi4yOTlDMjk5LjM0OCwzMzYuMjg1LDI4Mi41NjMsMzE5LjUsMjYxLjkzMiwzMTkuNXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                        />
                      }
                      title={
                        <Title level={3}>{this.state.numInsuringData}</Title>
                      }
                      description="Insurance Invested"
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col>
                  <Card
                    style={gridStyleTransactionTable}
                    title="Transactions"
                    bordered={false}
                    hoverable
                  >
                    <TransactionTable />
                  </Card>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={12}>
                  <Card
                    style={gridStyleInsuranceTable}
                    title="Insurance Owned"
                    bordered={false}
                    hoverable
                  >
                    <InsuranceOwnedTable />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    style={gridStyleInsuranceTable}
                    title="Insurance Invested"
                    bordered={false}
                    hoverable
                  >
                    <InsuranceInvestedTable />
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}
export default Home;
