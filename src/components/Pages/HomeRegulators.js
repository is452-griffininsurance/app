import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal, Layout, Card, Col, Row, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { confirm } = Modal;


const gridStyleReviewTable = {
  width: '100%',
  textAlign: 'center',
};


const reviewData = [
  {
    reviewID: '1',
    insuranceID: '1',
    reviewDate: '10/10/2020',
    reviewType: 'Report',
    reviewIssue: 'Terms and condition',
  },
  {
    reviewID: '2',
    insuranceID: '2',
    reviewDate: '09/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '3',
    insuranceID: '3',
    reviewDate: '08/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '4',
    insuranceID: '4',
    reviewDate: '07/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '5',
    insuranceID: '5',
    reviewDate: '06/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '6',
    insuranceID: '6',
    reviewDate: '05/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '7',
    insuranceID: '7',
    reviewDate: '04/10/2020',
    reviewType: 'Report',
    reviewIssue: 'Price',
  },
  {
    reviewID: '8',
    insuranceID: '8',
    reviewDate: '03/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '9',
    insuranceID: '9',
    reviewDate: '02/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
  {
    reviewID: '10',
    insuranceID: '10',
    reviewDate: '01/10/2020',
    reviewType: 'Verification',
    reviewIssue: '',
  },
];

const reviewTypeList = [
  { text: 'Report', value: 'Report' },
  { text: 'Verification', value: 'Verification' }

]

class HomeRegulator extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    selectedID: null,
    reviewID: null,
    reviewDate: null,
    reviewType: null,
    reviewIssue: null
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
      content: 'Do you want to approve Contract ID ' + content.insuranceID,
    });
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Review ID',
        dataIndex: 'reviewID',
        key: 'reviewID',
        sorter: (a, b) => a.reviewID - b.reviewID,
        sortOrder: sortedInfo.columnKey === 'reviewID' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Contract ID',
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
        filters: reviewTypeList,
        filteredValue: filteredInfo.reviewType || null,
        onFilter: (value, record) => record.reviewType.includes(value),
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
        render: (record) =>
          <><Button type="link" onClick={() => this.showConfirm(record)}>Approve</Button><Button type="link" onClick={() => this.showModal(record)}>More</Button></>,
      },
    ];
    return (
      <>
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }} >
            <h1 style={{ marginTop: 10 }}>Homepage - Regulators</h1>
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col>
                  <Card style={gridStyleReviewTable} title="Transactions" bordered={false} hoverable={true}>
                    <Table columns={columns} dataSource={reviewData} pagination={this.pagination} onChange={this.handleChange} />
                  </Card>
                </Col>
              </Row>
            </div>
            <Modal
              title={this.state.reviewType}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Review ID: {this.state.reviewID}</p>
              <p>Contract ID: {this.state.selectedID}</p>
            </Modal>
          </Content>
        </Layout>
      </>
    );
  }
}
export default HomeRegulator;
