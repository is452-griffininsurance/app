import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Table, Button, Space, Layout, Tag, Input, Row, Col } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { API_URL } from "../../utils/utils";

const { Content, Footer } = Layout;

const data = [
  {
    id: "John Brown",
    premium: 32,
    flightNo: "BA2490",
    status: "Closed",
    percentage: 1,
    departureDate: "31/12/2020",
  },
  {
    id: "Jim Green",
    premium: 42,
    flightNo: "BA2491A",
    status: "Closed",
    percentage: 1,
    departureDate: "1/12/2020",
  },
  {
    id: "Joe Black",
    premium: 32,
    flightNo: "BA2491A",
    status: "Open",
    percentage: 0.5,
    departureDate: "31/1/2022",
  },
  {
    id: "Jim Red",
    premium: 32,
    flightNo: "BA2490",
    status: "Open",
    percentage: 0.3,
    departureDate: "3/8/2021",
  },
];

class Insurance extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
    data: [],
  };

  componentDidMount() {
    fetch(`${API_URL}/get_all_insurances`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json?.insurance });
        console.log(json?.insurance);
      });
  }

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
        filteredValue: filteredInfo.id || null,
        onFilter: (value, record) => record.id.includes(value),
        sorter: (a, b) => a.id.localeCompare(b.id),
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
        sorter: (a, b) => a.premium - b.premium,
        sortOrder:
          sortedInfo.columnKey === "premium_amount" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "Flight no.",
        dataIndex: "flight_no",
        key: "flight_no",
        filters: [
          // what's this ah?
          { text: "London", value: "London" },
          { text: "New York", value: "New York" },
        ],
        filteredValue: filteredInfo.flightNo || null,
        onFilter: (value, record) => record.flightNo.includes(value),
        sorter: (a, b) => a.flightNo.localeCompare(b.flightNo),
        sortOrder: sortedInfo.columnKey === "flight_no" && sortedInfo.order,
        render: (flightNo) => {
          return <Tag> {flightNo} </Tag>;
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
        dataIndex: "percentage",
        key: "percentage",
        sorter: (a, b) => a.percentage - b.percentage,
        sortOrder: sortedInfo.columnKey === "percentage" && sortedInfo.order,
        render: (percentage) => {
          return `${percentage * 100}%`;
        },
        ellipsis: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "Open", value: "Open" },
          { text: "Closed", value: "Closed" },
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        sorter: (a, b) => a.status.localeCompare(b.status),
        sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
        render: (status) => {
          let color = "#87d068";
          if (status === "Closed") {
            color = "#FF0000";
          }
          return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
        ellipsis: true,
      },
      {
        title: "",
        key: "action",
        render: (status, record) => {
          // eslint-disable-next-line no-underscore-dangle
          const urlPath = `/investflight/${status._id}`;
          return (
            <Link to={urlPath}>
              <Button>Invest</Button>
            </Link>
          );
        },
      },
    ];

    return (
      <>
        <Layout className="layout">
          <Content style={{ padding: "0 50px" }}>
            <h1 style={{ marginTop: 10 }}>Flight Insurance ✈️</h1>
            <Row style={{ marginBottom: 10 }} justify="space-between">
              <Col>
                <Button onClick={this.clearAll}>
                  Clear filters and sorters
                </Button>
              </Col>
              <Col>
                <Link to="/createflight">
                  <Button type="primary" shape="circle">
                    <PlusOutlined />
                  </Button>
                </Link>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={this.state.data}
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
