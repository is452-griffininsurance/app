import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal, Layout, Card, Col, Row, Tag,  Tabs, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../../../App.css';


const { Content } = Layout;
const { confirm } = Modal;
const { TabPane } = Tabs;



const gridStyleReviewTable = {
  width: '100%',
  textAlign: 'center',
};


const reports = [
  {
    reviewID: '1',
    insuranceID: '0xasd9123osd923',
    reviewDate: '10/10/2020',
    reviewType: 'Report',
    reviewIssue: 'Terms and condition',
  },
  {
    reviewID: '2',
    insuranceID: '0xasd9123osd923',
    reviewDate: '04/10/2020',
    reviewType: 'Report',
    reviewIssue: 'Price',
  },
  {
    reviewID: '3',
    insuranceID: '5fasd9123osd923',
    reviewDate: '04/10/2020',
    reviewType: 'Report',
    reviewIssue: 'Flight does not exist',
  },
  {
    reviewID: '4',
    insuranceID: '0x1u23jsd89askn',
    reviewDate: '04/10/2020',
    reviewType: 'Report',
    reviewIssue: 'Terms and condition',
  },
  {
    reviewID: '5',
    insuranceID: '0xasd9123osd923',
    reviewDate: '04/10/2020',
    reviewType: 'Report',
    reviewIssue: 'Terms and condition',
  },
];

const verification = [
  {
    reviewID: '1',
    insuranceID: '0xasd9123osd923',
    reviewDate: '09/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '2',
    insuranceID: '0x1u23jsd89askn',
    reviewDate: '08/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '3',
    insuranceID: '0xasd9123osd923',
    reviewDate: '07/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '4',
    insuranceID: '5fasd9123osd923',
    reviewDate: '06/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '5',
    insuranceID: '0xasd9123osd923',
    reviewDate: '05/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
];


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
  </div>
);

class HomeRegulator extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    selectedID: null,
    reviewID: null,
    reviewDate: null,
    reviewType: null,
    reviewIssue: null,
    current: 'reports',
    reviewData: reports

  };

  pagination = {
    defaultPageSize: 10,
    size: "small",
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"]
  };

  showModal = (record) => {
    this.setState({
      visible: true,
      selectedID: record.insuranceID,
      reviewID: record.reviewID,
      reviewDate: record.reviewDate,
      reviewType: record.reviewType,
      reviewIssue: record.reviewIssue
    });
  };

  callback(key) {
    console.log(key);
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  showConfirm(content) {
    confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to approve?',
    });
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const reportColumns = [
      {
        title: 'Review ID',
        dataIndex: 'reviewID',
        key: 'reviewID',
        sorter: (a, b) => a.reviewID - b.reviewID,
        sortOrder: sortedInfo.columnKey === 'reviewID' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Contract Address',
        dataIndex: 'insuranceID',
        key: 'insuranceID',
        sorter: (a, b) => a.insuranceID - b.insuranceID,
        sortOrder: sortedInfo.columnKey === 'insuranceID' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Review Issue',
        dataIndex: 'reviewIssue',
        key: 'reviewIssue',
        sorter: (a, b) => a.reviewIssue.length - b.reviewIssue.length,
        sortOrder: sortedInfo.columnKey === 'reviewIssue' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Type',
        dataIndex: 'reviewType',
        key: 'reviewType',
        filteredValue: filteredInfo.reviewType || null,
        sorter: (a, b) => a.reviewType.length - b.reviewType.length,
        sortOrder: sortedInfo.columnKey === 'reviewType' && sortedInfo.order,
        render: reviewType => {
          if (reviewType == 'Report') {
            return <Tag color="red" key={reviewType}>{reviewType}</Tag>;
          } else if (reviewType == 'Verification') {
            return <Tag color="blue" key={reviewType}>{reviewType}</Tag>;
          }
          return reviewType;
        },
        ellipsis: true,
      },
      {
        title: 'Review Date',
        dataIndex: 'reviewDate',
        key: 'reviewDate',
        sorter: (a, b) => a.reviewDate.length - b.reviewDate.length,
        sortOrder: sortedInfo.columnKey === 'reviewDate' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: '',
        render: (record) => {
          return <><Button type="link" onClick={() => this.showConfirm(record)}>Approve</Button></>
        }
      },
    ];
    const verficationColumns = [
      {
        title: 'Review ID',
        dataIndex: 'reviewID',
        key: 'reviewID',
        sorter: (a, b) => a.reviewID - b.reviewID,
        sortOrder: sortedInfo.columnKey === 'reviewID' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Contract Address',
        dataIndex: 'insuranceID',
        key: 'insuranceID',
        sorter: (a, b) => a.insuranceID - b.insuranceID,
        sortOrder: sortedInfo.columnKey === 'insuranceID' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Type',
        dataIndex: 'reviewType',
        key: 'reviewType',
        filteredValue: filteredInfo.reviewType || null,
        sorter: (a, b) => a.reviewType.length - b.reviewType.length,
        sortOrder: sortedInfo.columnKey === 'reviewType' && sortedInfo.order,
        render: reviewType => {
          if (reviewType == 'Report') {
            return <Tag color="red" key={reviewType}>{reviewType}</Tag>;
          } else if (reviewType == 'Verification') {
            return <Tag color="blue" key={reviewType}>{reviewType}</Tag>;
          }
          return reviewType;
        },
        ellipsis: true,
      },
      {
        title: 'Review Date',
        dataIndex: 'reviewDate',
        key: 'reviewDate',
        sorter: (a, b) => a.reviewDate.length - b.reviewDate.length,
        sortOrder: sortedInfo.columnKey === 'reviewDate' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: '',
        render: (record) => {
          return <><Button type="link" onClick={() => this.showConfirm(record)}>Approve</Button><Button type="link" onClick={() => this.showModal(record)}>More</Button></>
        }
      }
    ];

    return (
      <>
        <Layout className="layout">
          <Content style={{ padding: '0 50px', minHeight: '100vh' }} >
            <h1 style={{ marginTop: 10 }}>Regulators</h1>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Reports" key="1">
                <div className="site-card-wrapper">

                  <Row gutter={16} style={{ marginBottom: 16, width: '100%', display: 'justify' }}>
                    <Col>
                      <Card style={gridStyleReviewTable} bordered={false} hoverable={true}>
                        <Table columns={reportColumns} dataSource={reports} pagination={this.pagination} onChange={this.handleChange} />
                      </Card>
                    </Col>
                  </Row>
                </div>

              </TabPane>
              <TabPane tab="Verification" key="2">
                <div className="site-card-wrapper">
                  <Row gutter={16} style={{ marginBottom: 16, width: '100%', display: 'justify' }}>
                    <Col>
                      <Card style={gridStyleReviewTable} bordered={false} hoverable={true}>
                        <Table columns={verficationColumns} dataSource={verification} pagination={this.pagination} onChange={this.handleChange} />
                      </Card>
                    </Col>
                  </Row>
                </div>

              </TabPane>
            </Tabs>

            <Modal
              title={this.state.reviewType}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >

              <Row><Col span={15}><p className="site-description-item-profile-p">Insured Details</p></Col></Row>
              <Row>
                <Col span={15}>
                  <DescriptionItem title="Review ID" content={this.state.reviewID} />
                </Col>
                <Col span={15}>
                  <DescriptionItem title="Contract ID" content={this.state.selectedID} />
                </Col>
              </Row>
              <Divider />
              <Row><Col span={15}><p className="site-description-item-profile-p">Document</p></Col></Row>
              <Row>
                <Col span={15}>
                  <img src={require('../../Assets/claim.png')} style={{height:'80%',width:'80%'}}/>
                </Col>
              </Row>
            </Modal>
          </Content>
        </Layout>
      </>
    );
  }
}
export default HomeRegulator;
