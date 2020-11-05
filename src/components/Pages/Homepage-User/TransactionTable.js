import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from 'antd';
import { getAllTransactions } from '../../api'


const typeTransactionList = [
    { text: 'Paying', value: 'Paying' },
    { text: 'Receiving', value: 'Receiving' },

]

class TransactionTable extends Component {
    state = {
        FilteredInfo: null,
        sortedInfo: null,
        transactionApiData: [],
        transactionData: []

    };
    async componentWillMount() {
        await this.loadDBData()
    }
    async loadDBData() {
        let temp = await getAllTransactions()
        this.setState({
            transactionApiData: temp
        });
        this.cleanData()
    }
    cleanData(){
        let paying = this.state.transactionApiData.paying_transactions
        let receiving = this.state.transactionApiData.receiving_transactions
        let tempDictionary = []

        for (let i = 0; i < paying.length; i++) {
            paying[i]['transactionType'] = 'Paying'
            tempDictionary.push(paying[i])
        }
        for (let i = 0; i < receiving.length; i++) {
            receiving[i]['transactionType'] = 'Receiving'
            tempDictionary.push(receiving[i])
        }
        this.setState({
            transactionData: tempDictionary
        });
    }
    pagination = {
        defaultPageSize: 5,
        size: "small"
    };

    handleChange = (pagination, filters, sorter) => {
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
                dataIndex: '_id',
                key: '_id',
                sorter: (a, b) => a._id.localeCompare(b._id),
                sortOrder: sortedInfo.columnKey === '_id' && sortedInfo.order,
                ellipsis: true,
                width: '15%'
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                sorter: (a, b) => a.date - b.date,
                sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
                ellipsis: true,
                width: '10%'
            },
            {
                title: 'Sending Wallet Address',
                dataIndex: 'sending_wallet_addr',
                key: 'sending_wallet_addr',
                sorter: (a, b) => a.sending_wallet_addr.localeCompare(b.sending_wallet_addr),
                sortOrder: sortedInfo.columnKey === 'sending_wallet_addr' && sortedInfo.order,
                ellipsis: true,
                width: '27.5%'

            },
            {
                title:'Receiving Wallet Address',
                dataIndex: 'receiving_wallet_addr',
                key: 'receiving_wallet_addr',
                sorter: (a, b) => a.receiving_wallet_addr - b.receiving_wallet_addr,
                sortOrder: sortedInfo.columnKey === 'receiving_wallet_addr' && sortedInfo.order,
                ellipsis: true,
                width: '27.5%'

            },
            {
                title: 'Amount',
                dataIndex: 'transfer_amount',
                key: 'transfer_amount',
                sorter: (a, b) => a.transfer_amount - b.transfer_amount,
                sortOrder: sortedInfo.columnKey === 'transfer_amount' && sortedInfo.order,
                ellipsis: true,
                width: '10%'
            },
            {
                title: <div>Transaction<br/>Type</div>,
                dataIndex: 'transactionType',
                key: 'transactionType',
                filters: typeTransactionList,
                onFilter: (value, record) => record.transactionType.includes(value),
                ellipsis: true,
                render: transactionType => {
                    if (transactionType == 'Paying') {
                        return <Tag color="red" key={transactionType}>{transactionType}</Tag>;
                    } else if (transactionType == 'Receiving') {
                        return <Tag color="green" key={transactionType}>{transactionType}</Tag>;
                    }
                    return transactionType
                },
                width: '10%'

            },
        ];
        return (
            <>
                <Table columns={columns} dataSource={this.state.transactionData} pagination={this.pagination} onChange={this.handleChange} />
            </>
        );
    }
}
export default TransactionTable;
