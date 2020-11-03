import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag, Tooltip, Row, Col, Divider } from 'antd';
import { getAllInsurance } from '../../api';
import '../../../App.css';

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);


const insuranceData = [
    // {
    // "insuring_insurances": 
    // [
    {
        "key": 1,
        "_id": "5f9b02ef07c1008333c9ec27",
        "contract_address": "0x023mc0912mdsq0",
        "coverage_amount": 1234.56,
        "flight_date": "2020-12-12",
        "flight_no": "SQ123",
        "insurance_type": "flight_delay",
        "insured_wallet_addr": "0xa012312310",
        "insurers": [
            {
                "insuring_amount": 123,
                "wallet_addr": "0x1u23jsd89askn"
            }
        ],
        "max_insured_amount": 1234.56,
        "min_insured_amount": 1234.56,
        "percent_insured": 0.09963063763608088,
        "premium_amount": 1234.56,
        "status": "open"
    },
    {
        "key": 2,
        "_id": "5f9b0603c79b6c43b7319059",
        "contract_address": "0xasdaw1231232",
        "coverage_amount": 1234.56,
        "flight_date": "2020-12-23",
        "flight_no": "SQ565",
        "insurance_type": "flight_delay",
        "insured_wallet_addr": "0xkwkwi120",
        "insurers": [
            {
                "insuring_amount": 123,
                "wallet_addr": "0x1u23jsd89askn"
            }
        ],
        "max_insured_amount": 1234.56,
        "min_insured_amount": 1234.56,
        "percent_insured": 0.09963063763608088,
        "premium_amount": 1234.56,
        "status": "open"
    }
    //     ]
    // }

];

const typeInsuranceList = [
    { text: 'Car', value: 'Car' },
    { text: 'Flight Delay', value: 'flight_delay' }
]
const statusList = [
    { text: 'Open', value: 'Open' },
    { text: 'Close', value: 'Close' }
]


class InsuranceInvestedTable extends Component {
    state = {
        insuranceOwnedFilteredInfo: null,
        sortedInfo: null,
        visible: false
    };

    pagination = {
        defaultPageSize: 5,
        size: "small"
    };
    async componentWillMount() {
        await this.loadDBData()
    }
    async loadDBData() {
        let temp = await getAllInsurance()
        console.log(temp)
        this.setState({
            insuranceData: temp.insuring_insurances
        });
        this.cleanData()
        console.log(this.state.insuranceData)
    }
    cleanData() {
        let temp = []
        for (let i = 0; i < this.state.insuranceData.length; i++) {
            this.state.insuranceData[i]['key'] = i
            this.state.insuranceData[i]['insuranceType'] = 'Flight'
            temp.push(this.state.insuranceData[i])
        }
        this.setState({
            insuranceData: temp
        })
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            insuranceOwnedFilteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    render() {
        let { sortedInfo, insuranceOwnedFilteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        insuranceOwnedFilteredInfo = insuranceOwnedFilteredInfo || {};
        const columns = [
            {
                title: 'Insurance ID',
                dataIndex: '_id',
                key: 'insuranceID',
                sorter: (a, b) => a.insuranceID - b.insuranceID,
                sortOrder: sortedInfo.columnKey === 'insuranceID' && sortedInfo.order,
                ellipsis: true,
                render: _id => (
                    <Tooltip placement="topLeft" title={_id}>
                        {_id}
                    </Tooltip>
                ),
            },
            {
                title: 'Contract Address',
                dataIndex: 'contract_address',
                key: 'contract_address',
                sorter: (a, b) => a.contract_address - b.contract_address,
                sortOrder: sortedInfo.columnKey === 'contract_address' && sortedInfo.order,
                ellipsis: true,
                render: contract_address => (
                    <Tooltip placement="topLeft" title={contract_address}>
                        {contract_address}
                    </Tooltip>
                ),
            },
            {
                title: 'Insurance Type',
                dataIndex: 'insurance_type',
                key: 'insurance_type',
                filters: typeInsuranceList,
                onFilter: (value, record) => record.insurance_type.includes(value),
                sortOrder: sortedInfo.columnKey === 'insurance_type' && sortedInfo.order,
                ellipsis: true,
                render: insurance_type => {
                    if (insurance_type == 'Car') {
                        return <Tag color="blue" key={insurance_type}>{insurance_type}</Tag>;
                    } else if (insurance_type == 'flight_delay') {
                        return <Tag color="orange" key={insurance_type}><Tooltip placement="topLeft" title="Flight Delay">Flight Delay</Tooltip></Tag>;
                    }
                    return insurance_type;
                },
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                dataIndex: 'status',
                filters: statusList,
                onFilter: (value, record) => record.status.includes(value),
                ellipsis: true,
                render: status => {
                    if (status == 'open') {
                        return <Tag color="green" key={status}>{}<Tooltip placement="topLeft" title={status.toUpperCase()}>{status.toUpperCase()}</Tooltip></Tag>;
                    } else if (status == 'close') {
                        return <Tag color="red" key={status}><Tooltip placement="topLeft" title={status.toUpperCase()}>{status.toUpperCase()}</Tooltip></Tag>;
                    }
                    return <Tooltip placement="topLeft" title={status.toUpperCase()}>{status.toUpperCase()}</Tooltip>;
                },
                width: '10%'
            }
        ];

        const columnsInsurers = [
            {
                title: <div style={{color:'rgb(61, 61, 61)'}}>Wallet Address</div>,
                dataIndex: 'wallet_addr',
                key: 'wallet_addr',
                ellipsis: true,
                render: wallet_addr => (
                    <Tooltip placement="topLeft" title={wallet_addr}>
                        <div style={{color:'rgb(121, 121, 121)'}}>{wallet_addr}</div>
                    </Tooltip>
                ),
            },
            {
                title: <div style={{color:'rgb(61, 61, 61)'}}>Insuring Amount </div>,
                dataIndex: 'insuring_amount',
                key: 'insuring_amount',
                ellipsis: true,
                render: insuring_amount => (
                    <Tooltip placement="topLeft" title={insuring_amount} >
                        <div style={{color:'rgb(121, 121, 121)'}}>{insuring_amount}</div>
                    </Tooltip>
                ),
            },
        ];
        return (
            <>
                <Table columns={columns}
                    dataSource={insuranceData}
                    pagination={this.pagination}
                    onChange={this.handleChange}
                    size="small"
                    expandable={{
                        expandedRowRender: record =>
                            <>
                                <Row><Col span={15}><p className="site-description-item-profile-p">Insured Details</p></Col></Row>
                                <Row>
                                    <Col span={15}>
                                        <DescriptionItem title="Insured Wallet Address" content={record.insured_wallet_addr} />
                                    </Col>
                                </Row>
                                <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />
                                <Row><Col span={15}><p className="site-description-item-profile-p">Insurers</p></Col></Row>
                                <Row>
                                    <Col style={{ width: '90%' }}>
                                        <Table columns={columnsInsurers} dataSource={record.insurers} size="small" pagination={false} bordered />
                                    </Col>
                                </Row>
                                <Divider style={{ marginBottom: '5px', marginTop: '15px' }} />
                                <Row><Col span={15}><p className="site-description-item-profile-p">Terms & Conditions</p></Col></Row>
                                <Row>
                                    <Col span={12}>
                                        <DescriptionItem title="Coverage Amount" content={record.coverage_amount} />
                                    </Col>
                                    <Col span={12}>
                                        <DescriptionItem title="Premium Amount" content={record.premium_amount} />
                                    </Col>
                                    <Col span={12}>
                                        <DescriptionItem title="Max Insured Amount" content={record.max_insured_amount} />
                                    </Col>
                                    <Col span={12}>
                                        <DescriptionItem title="Min Insured Amount" content={record.min_insured_amount} />
                                    </Col>
                                    <Col span={12}>
                                        <DescriptionItem title="Percentage Insured" content={record.percent_insured} />
                                    </Col>
                                </Row>
                                <Divider style={{ marginBottom: '5px', marginTop: '15px' }} />
                                <Row><Col span={15}><p className="site-description-item-profile-p">Flight Information</p></Col></Row>
                                <Row>
                                    <Col span={12}>
                                        <DescriptionItem title="Flight Date" content={record.flight_date} />
                                    </Col>
                                    <Col span={12}>
                                        <DescriptionItem title="Flight Number" content={record.flight_no} />
                                    </Col>
                                </Row>
                            </>
                    }}
                />
            </>
        );
    }
}
export default InsuranceInvestedTable;