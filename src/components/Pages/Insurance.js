import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import {
  DollarCircleOutlined,
  CarOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Layout, Card, Col, Row, Button, Divider } from "antd";

const { Content, Footer } = Layout;

function Insurance() {
  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px", height: "100vh" }}>
          <h1 style={{ marginTop: 10 }}>Insurance</h1>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Car Insurance 🚘" bordered>
                  <h3>
                    Financial protection against physical damage or bodily
                    injury resulting from traffic collisions and against
                    liability that could also arise from incidents in your car
                    today!
                  </h3>
                  <Divider />
                  <Row
                    justify="space-around"
                    align="middle"
                    style={{ padding: "10px 10px" }}
                  >
                    <Button type="primary" size="large">
                      <CarOutlined /> Get insured for your car
                    </Button>
                    <Button type="primary" size="large">
                      <DollarCircleOutlined /> Invest in Car Insurance
                    </Button>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Flight Insurance ✈️" bordered>
                  <h3>
                    A trip delay insurance will provide you reimbursement for
                    additional transportation costs or lodging should your
                    flight be delayed by inclement weather or other covered
                    reasons.
                  </h3>
                  <Divider />
                  <Row
                    justify="space-around"
                    align="middle"
                    style={{ padding: "10px 10px" }}
                  >
                    <Link to="/createflight">
                      <Button type="primary" size="large">
                        <RocketOutlined /> Get insured for your flight
                      </Button>
                    </Link>
                    <Link to="/flight">
                      <Button type="primary" size="large">
                        <DollarCircleOutlined /> Invest in Flight Insurance
                      </Button>
                    </Link>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default Insurance;
