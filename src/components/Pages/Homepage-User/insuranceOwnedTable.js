import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag, Modal, Button } from 'antd';




const insuranceData = [
    {
        insuranceID: '1',
        insuranceType: 'Car',
        payoutAmount: 32,
    },
    {
        insuranceID: '2',
        insuranceType: 'Flight',
        payoutAmount: 32,
    },
    {
        insuranceID: '3',
        insuranceType: 'Flight',
        payoutAmount: 100,
    },
    {
        insuranceID: '4',
        insuranceType: 'Car',
        payoutAmount: 2,
    },
    {
        insuranceID: '5',
        insuranceType: 'Car',
        payoutAmount: 20,
    },
    {
        insuranceID: '6',
        insuranceType: 'Flight',
        payoutAmount: 32,
    },
];

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
        selectedPayoutAmount: null
    };

    pagination = {
        defaultPageSize: 5,
        size: "small"
    };

    showModal = (record) => {
        this.setState({
            visible: true,
            selectedID: record.insuranceID,
            selectedInsuranceType: record.insuranceType,
            selectedPayoutAmount: record.payoutAmount
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

    clearFilters = () => {
        this.setState({ insuranceOwnedFilteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            insuranceOwnedFilteredInfo: null,
            sortedInfo: null,
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
                dataIndex: 'insuranceID',
                key: 'insuranceID',
                sorter: (a, b) => a.insuranceID - b.insuranceID,
                sortOrder: sortedInfo.columnKey === 'insuranceID' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Payout Amount',
                dataIndex: 'payoutAmount',
                key: 'payoutAmount',
                sorter: (a, b) => a.payoutAmount - b.payoutAmount,
                sortOrder: sortedInfo.columnKey === 'payoutAmount' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Insurance Type',
                dataIndex: 'insuranceType',
                key: 'insuranceType',
                filters: typeInsuranceList,
                onFilter: (value, record) => record.insuranceType.includes(value),
                sorter: (a, b) => a.insuranceType.length - b.insuranceType.length,
                sortOrder: sortedInfo.columnKey === 'insuranceType' && sortedInfo.order,
                ellipsis: true,
                render: insuranceType => {
                    if (insuranceType == 'Car') {
                        return <Tag color="blue" key={insuranceType}>{insuranceType}</Tag>;
                    } else if (insuranceType == 'Flight') {
                        return <Tag color="orange" key={insuranceType}>{insuranceType}</Tag>;
                    }
                    return insuranceType;
                },
            },
            {
                title: 'Action',
                dataIndex: '',
                key: '',
                render: (record) => <><Button type="link" onClick={() => this.showModal(record)}>More</Button> <Button type="link" onClick={() => this.showModal(record)}>Upload</Button></>,
            },
        ];
        return (
            <>
                <Table columns={columns} dataSource={insuranceData} pagination={this.pagination} onChange={this.handleChange} />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Insurance ID: {this.state.selectedID}</p>                    
                    <p>Insurance Type: {this.state.selectedInsuranceType}</p>
                    <p>Payout Amount: {this.state.selectedPayoutAmount}</p>
                    <p>THE REST OF THE INSURANCE INFORMATION</p>
                </Modal>
            </>
        );
    }
}
export default InsuranceOwnedTable;
