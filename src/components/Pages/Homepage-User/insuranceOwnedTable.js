import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag, Tooltip, Descriptions, Upload, message, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAllInsurance } from '../../api';



const typeInsuranceList = [
    { text: 'Car', value: 'Car' },
    { text: 'Flight', value: 'Flight' }
]
const statusList = [
    { text: 'Open', value: 'Open' },
    { text: 'Close', value: 'Close' }
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
        console.log(temp)
        this.setState({
            insuranceData: temp.insured_insurances
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
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
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
                title: 'Insurance ID',
                dataIndex: '_id',
                key: '_id',
                sorter: (a, b) => a._id - b._id,
                sortOrder: sortedInfo.columnKey === '_id' && sortedInfo.order,
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
                title: 'Insured Wallet',
                dataIndex: 'insured_wallet_addr',
                key: 'insured_wallet_addr',
                sorter: (a, b) => a.insured_wallet_addr - b.insured_wallet_addr,
                sortOrder: sortedInfo.columnKey === 'insured_wallet_addr' && sortedInfo.order,
                ellipsis: true,
                render: insured_wallet_addr => (
                    <Tooltip placement="topLeft" title={insured_wallet_addr}>
                        {insured_wallet_addr}
                    </Tooltip>
                ),
            },
            {
                title: 'Insurance Type',
                dataIndex: 'insuranceType',
                key: 'insuranceType',
                filters: typeInsuranceList,
                onFilter: (value, record) => record.insuranceType.includes(value),
                // sorter: (a, b) => a.insuranceType.length - b.insuranceType.length,
                // sortOrder: sortedInfo.columnKey === 'insuranceType' && sortedInfo.order,
                ellipsis: true,
                render: insuranceType => {
                    if (insuranceType == 'Car') {
                        return <Tag color="blue" key={insuranceType}> <Tooltip placement="topLeft" title={insuranceType}>{insuranceType}</Tooltip></Tag>;
                    } else if (insuranceType == 'Flight') {
                        return <Tag color="orange" key={insuranceType}> <Tooltip placement="topLeft" title={insuranceType}>{insuranceType}</Tooltip></Tag>;
                    }
                    return <Tooltip placement="topLeft" title={insuranceType}>{insuranceType}</Tooltip>;
                },
            },
            // {
            //     title: 'Coverage Amt',
            //     dataIndex: 'coverage_amount',
            //     key: 'coverage_amount',
            //     sorter: (a, b) => a.coverage_amount - b.coverage_amount,
            //     sortOrder: sortedInfo.columnKey === 'coverage_amount' && sortedInfo.order,
            //     ellipsis: true,
            //     render: coverage_amount => (
            //         <Tooltip placement="topLeft" title={coverage_amount}>
            //             {coverage_amount}
            //         </Tooltip>
            //     ),
            // },
            // {
            //     title: 'Premium Amt',
            //     dataIndex: 'premium_amount',
            //     key: 'premium_amount',
            //     sorter: (a, b) => a.premium_amount - b.premium_amount,
            //     sortOrder: sortedInfo.columnKey === 'premium_amount' && sortedInfo.order,
            //     ellipsis: true,
            //     render: premium_amount => (
            //         <Tooltip placement="topLeft" title={premium_amount}>
            //             {premium_amount}
            //         </Tooltip>
            //     ),
            // },

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
            },
            // {
            //     title: 'Action',
            //     dataIndex: '',
            //     key: '',
            //     render: (record) => <><Button type="link" onClick={() => this.showModal(record)}>More</Button></>,
            // },
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
                            <Space>
                                <div style={{ backgroundColor: 'white' }}>
                                    <Descriptions
                                        bordered
                                        size='large'
                                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                                    >
                                        <Descriptions.Item label='Coverage Amount'>{record.coverage_amount}</Descriptions.Item>
                                        <Descriptions.Item label='Premium Amount'>{record.premium_amount}</Descriptions.Item>
                                        <Descriptions.Item label={record.insuranceType + ' Date'}>{record.flight_date}</Descriptions.Item>
                                        <Descriptions.Item label={record.insuranceType + ' Number'}>{record.flight_no}</Descriptions.Item>
                                        <Descriptions.Item label='Insurers'>{record.insurers}</Descriptions.Item>
                                    </Descriptions>
                                </div>
                                <div>
                                    <Upload>
                                        <Button icon={<UploadOutlined />} style={{ position: 'flex', bottom: '0' }}>Click to Upload</Button>
                                    </Upload>
                                </div>
                            </Space>

                        </>
                    }}
                />
            </>
        );
    }
}
export default InsuranceOwnedTable;
