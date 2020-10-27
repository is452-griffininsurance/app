import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from 'antd';

const transactionData = [
    {
        transactionID: 1234345,
        insuranceID: 1234345,
        amount: 32,
        transactionType: 'Paying',
    },
    {
        transactionID: 1234345,
        insuranceID: 9876543,
        amount: 32,
        transactionType: 'Receiving',
    },
    {
        transactionID: 1234345,
        insuranceID: 9876543,
        amount: 100,
        transactionType: 'Receiving',
    },
    {
        transactionID: 1234345,
        insuranceID: 9876543,
        amount: 2,
        transactionType: 'Paying',
    },
    {
        transactionID: 1234345,
        insuranceID: 1234345,
        amount: 20,
        transactionType: 'Paying',
    },
    {
        transactionID: 1234345,
        insuranceID: 1234345,
        amount: 32,
        transactionType: 'Paying',
    },
];

const typeTransactionList = [
    { text: 'Paying', value: 'Paying' },
    { text: 'Receiving', value: 'Receiving' },

]
const insuranceIDList = [
    { text: '1234345', value: '1234345' },
    { text: '9876543', value: '9876543' },

]

class TransactionTable extends Component {
    state = {
        FilteredInfo: null,
        sortedInfo: null,

    };

    pagination = {
        defaultPageSize: 5,
        size: "small"
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            FilteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ FilteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            FilteredInfo: null,
            sortedInfo: null,
        });
    };

    callback(key) {
        console.log(key);
    }

    render() {
        let { sortedInfo, FilteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        FilteredInfo = FilteredInfo || {};
        const columns = [
            {
                title: 'Transaction ID',
                dataIndex: 'transactionID',
                key: 'transactionID',
                sorter: (a, b) => a.transactionID - b.transactionID,
                sortOrder: sortedInfo.columnKey === 'transactionID' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Insurance ID',
                dataIndex: 'insuranceID',
                key: 'insuranceID',
                // filters: insuranceIDList,
                // onFilter: (value, record) => record.insuranceID.includes(value),
                sorter: (a, b) => a.insuranceID - b.insuranceID,
                sortOrder: sortedInfo.columnKey === 'insuranceID' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                sorter: (a, b) => a.amount - b.amount,
                sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Transaction Type',
                dataIndex: 'transactionType',
                key: 'transactionType',
                filters: typeTransactionList,
                onFilter: (value, record) => record.transactionType.includes(value),
                sorter: (a, b) => a.transactionType.length - b.transactionType.length,
                sortOrder: sortedInfo.columnKey === 'transactionType' && sortedInfo.order,
                ellipsis: true,
                render: transactionType => {
                    if (transactionType == 'Paying') {
                        return <Tag color="red" key={transactionType}>{transactionType}</Tag>;
                    } else if (transactionType == 'Receiving') {
                        return <Tag color="green" key={transactionType}>{transactionType}</Tag>;
                    }
                    return transactionType
                },
            },
        ];
        return (
            <>
                <Table columns={columns} dataSource={transactionData} pagination={this.pagination} onChange={this.handleChange} />
            </>
        );
    }
}
export default TransactionTable;
