import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Table, Button, Space, Layout, Tag, Input, Row, Col } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { API_URL } from "../../utils/utils";

import { getAllFlightInsurances } from '../api.js'

const { Content, Footer } = Layout;

class Insurance extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
    insuranceData: [],
    data: [],
  };

  // tempinsuranceData = [];

  async componentWillMount() {
    await this.loadDBdata();
  }

  async loadDBdata() {
    let data = await getAllFlightInsurances()
    // console.log(data)
    this.setState({
      insuranceData: data.insurances,
    });
    console.log(this.state.insuranceData)
  }

  // componentDidMount() {
  //   fetch(`${API_URL} + /get_all_insurances?insurance_type=flight_delay&status=open`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({ data: json?.insurance });
  //       console.log(json?.insurance);
  //     });
  // }

  // Table
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              this.handleSearch(selectedKeys, confirm, dataIndex)
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
          </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
          </Button>
          </Space>
        </div>
      ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      indeterminate: true,
      checkAll: true,
    });
  };

  // clearFilters = () => {
  //   this.setState({ filteredInfo: null });
  // };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  // setStatusSort = () => {
  //   this.setState({
  //     sortedInfo: {
  //       order: 'descend',
  //       columnKey: 'status',
  //     },
  //   });
  // };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Insurance ID",
        dataIndex: "_id",
        key: "_id",
        filteredValue: filteredInfo._id || null,
        onFilter: (value, record) => record._id.includes(value),
        sorter: (a, b) => a._id.localeCompare(b._id),
        sortOrder: sortedInfo.columnKey === "_id" && sortedInfo.order,
        ...this.getColumnSearchProps("_id"),
        ellipsis: true,
      },
      {
        title: "Contract Address",
        key: "contract_address",
        render: (status) => {
          const rinkebyUrl = `https://rinkeby.etherscan.io/address/${status.contract_address}`;
          return (
            <a href={rinkebyUrl} target="_blank" rel="noopener noreferrer">
              {status.contract_address}
            </a>
          );
        },
        filteredValue: filteredInfo.id || null,
        onFilter: (value, record) => record.id.includes(value),
        ellipsis: true,
      },
      {
        title: "Premium",
        dataIndex: "premium_amount",
        key: "premium_amount",
        sorter: (a, b) => a.premium_amount - b.premium_amount,
        sortOrder:
          sortedInfo.columnKey === "premium_amount" && sortedInfo.order,
        ellipsis: true,
        render: (premium_amount) => {
          return premium_amount + " ETH"
        }
      },
      {
        title: "Flight no.",
        dataIndex: "flight_no",
        key: "flight_no",
        filteredValue: filteredInfo.flight_no || null,
        onFilter: (value, record) => record.flight_no.includes(value),
        sorter: (a, b) => a.flight_no.localeCompare(b.flight_no),
        sortOrder: sortedInfo.columnKey === "flight_no" && sortedInfo.order,
        render: (flight_no) => {
          return <Tag> {flight_no} </Tag>;
        },
        ...this.getColumnSearchProps("flight_no"),
        ellipsis: true,
      },
      {
        title: "Departure Date",
        dataIndex: "flight_date",
        key: "flight_date",
        sorter: (a, b) => a.departureDate - b.departureDate,
        sortOrder: sortedInfo.columnKey === "flight_date" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "Percentage",
        dataIndex: "percent_insured",
        key: "percent_insured",
        sorter: (a, b) => a.percent_insured - b.percent_insured,
        sortOrder: sortedInfo.columnKey === "percent_insured" && sortedInfo.order,
        render: (percent_insured) => {
          return (percent_insured * 100).toFixed(2) + "%";
        },
        ellipsis: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status, record) => {
          let color = "#87d068";
          let tagValue = "Open"
          if (record.percent_insured === 1) {
            color = "#FF0000";
            tagValue = "Completed"
          }
          return <Tag color={color}>{tagValue.toUpperCase()}</Tag>;
        },
        ellipsis: true,
      },
      {
        title: "",
        key: "action",
        render: (status, record) => {
          // eslint-disable-next-line no-underscore-dangle
          const urlPath = `/investflight/${status._id}`;
          if (record.percent_insured < 1) {
            return (
              <Link to={urlPath}>
                <Button>Invest</Button>
              </Link>
            );
          }
        },
      },
    ];

    return (
      <>
        <Layout className="layout">
          <Content style={{ padding: "0 50px", height: "100vh" }}>
            <h1 style={{ marginTop: 10 }}>Flight Insurance ✈️</h1>
            {this.insuranceData}
            <Row style={{ marginBottom: 10 }} justify="space-between">
              <Col>
                <Button onClick={this.clearAll}>
                  Clear filters and sorters
                </Button>
              </Col>
              <Col>
                <Link to="/createflight">
                  <Button >
                    Create New <PlusOutlined />
                  </Button>
                </Link>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={this.state.insuranceData}
              onChange={this.handleChange}
            />
          </Content>
          <Footer />
        </Layout>
      </>
    );
  }
}

export default Insurance;
