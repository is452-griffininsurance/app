import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag, Tooltip, Upload, Button, Row, Col, Divider, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAllInsurance } from '../../api';
import '../../../App.css';

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const typeInsuranceList = [
    { text: 'Car', value: 'Car' },
    { text: 'Flight', value: 'Flight' }
]


class InsuranceOwnedTable extends Component {
    state = {
        insuranceOwnedFilteredInfo: null,
        sortedInfo: null,
        visible: false,
        selectedID: null,
        selectedInsuranceType: null,
        selectedPayoutAmount: null,
        insuranceData: []
    };
    async componentWillMount() {
        await this.loadDBData()
    }
    async loadDBData() {
        let temp = await getAllInsurance()
        this.setState({
            insuranceData: temp.insured_insurances
        });
        this.cleanData()
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

    pagination = {
        defaultPageSize: 5,
        size: "small"
    };

    showModal = (record) => {
        this.setState({
            visible: true,
            selectedID: record.contract_address,
            selectedInsuranceType: record.insuranceType,
            selectedPayoutAmount: record.coverage_amount
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


    handleChange = (pagination, filters, sorter) => {
        this.setState({
            insuranceOwnedFilteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    callback(key) {
        console.log(key);
    }



    render() {
        let { sortedInfo, insuranceOwnedFilteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        insuranceOwnedFilteredInfo = insuranceOwnedFilteredInfo || {};
        const columns = [
            {
                title: <div>Insurance<br/>Address</div>,
                dataIndex: '_id',
                key: '_id',
                sorter: (a, b) => a._id.localeCompare(b._id),
                sortOrder: sortedInfo.columnKey === '_id' && sortedInfo.order,
                ellipsis: true,
                render: _id => (
                    <Tooltip placement="topLeft" title={_id}>
                        {_id}
                    </Tooltip>
                ),
            },
            {
                title: <div>Contract<br/>Address</div>,
                dataIndex: 'contract_address',
                key: 'contract_address',
                sorter: (a, b) => a.contract_address.localeCompare(b.contract_address),
                sortOrder: sortedInfo.columnKey === 'contract_address' && sortedInfo.order,
                ellipsis: true,
                render: contract_address => (
                    <Tooltip placement="topLeft" title={contract_address}>
                        {contract_address}
                    </Tooltip>
                ),
            },
            {
                title: <div>Insurance<br />Type</div>,
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
                ellipsis: true,
                render: (status, record) => {
                    if (record.percent_insured === 1){
                        return <Tag color="red" key='COMPLETED'><Tooltip placement="topLeft" title='COMPLETED'>COMPLETED</Tooltip></Tag>;
                    } else if (record.status == 'open') {
                        return <Tag color="green" key={record.status}><Tooltip placement="topLeft" title={record.status.toUpperCase()}>{record.status.toUpperCase()}</Tooltip></Tag>;
                    } 
                    return <Tooltip placement="topLeft" title={record.status}>{record.status}</Tooltip>;
                },
            }
        ];
        const columnsInsurers = [
            {
                title: <div style={{ color: 'rgb(61, 61, 61)' }}>Wallet Address</div>,
                dataIndex: 'wallet_addr',
                key: 'wallet_addr',
                ellipsis: true,
                render: wallet_addr => (
                    <Tooltip placement="topLeft" title={wallet_addr}>
                        <div style={{ color: 'rgb(121, 121, 121)' }}>{wallet_addr}</div>
                    </Tooltip>
                ),
                width: '80%'
            },
            {
                title: <div style={{ color: 'rgb(61, 61, 61)' }}>Insuring<br/>Amount </div>,
                dataIndex: 'insuring_amount',
                key: 'insuring_amount',
                ellipsis: true,
                render: insuring_amount => (
                    <Tooltip placement="topLeft" title={insuring_amount} >
                        <div style={{ color: 'rgb(121, 121, 121)' }}>{insuring_amount}</div>
                    </Tooltip>
                ),
            },
        ];
        return (
            <>
                <Table columns={columns}
                    dataSource={this.state.insuranceData}
                    pagination={this.pagination}
                    onChange={this.handleChange}
                    size="small"
                    expandable={{
                        expandedRowRender: record => <>
                            <Row><Col span={15}><p className="site-description-item-profile-p">Insured Details</p></Col></Row>
                            <Row>
                                <Col span={15}>
                                    <DescriptionItem title="Insured Wallet Address" content={record.insured_wallet_addr} />
                                </Col>
                            </Row>
                            <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />
                            <Row><Col span={15}><p className="site-description-item-profile-p">Percentage Insured</p></Col></Row>
                            <Row>
                                <Col span={15}>
                                <Progress percent={(record.percent_insured * 100).toFixed(2)} status="active" style={{marginLeft: '10%'}}/>
                                </Col>   
                            </Row>
                            <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />
                            <Row><Col span={15}><p className="site-description-item-profile-p">Insurers</p></Col></Row>
                            <Row>
                                <Col style={{width: '90%'}}>
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
                                <Col span={22} style={{ textAlign: 'right' }}>
                                    <Upload >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </>
                    }}
                />
            </>
        );
    }
}
export default InsuranceOwnedTable;
