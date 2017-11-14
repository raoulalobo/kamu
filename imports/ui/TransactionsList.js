import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Transactions } from '../api/transactions';

import EmptyTableItem from './EmptyTableItem';
import TransactionsListItem from './TransactionsListItem';


export class TransactionsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { transactions } = nextProps;
        console.log(this.props)
        console.log(nextProps)
        this.props.Session.set('transactions', transactions);

    }
    componentWillUnmount() {
        Meteor.subscribe('transactions').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell>Produit</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Quantite</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.transactions.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.transactions.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.transactions.length && !this.props.loading ? ( this.props.Session.get('transactions')  ).map( (transaction) => { return <TransactionsListItem key={transaction._id} transaction={transaction}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

TransactionsList.propTypes = {
    transactions: PropTypes.array
};

export default createContainer(() => {


    const transactionsHandle = Meteor.subscribe('transactions');
    const loading = !transactionsHandle.ready();

    return {
        Session,
        loading,
        transactions : Transactions.find({visible: true}).fetch().map((transaction)=>{
            return {
                ...transaction
            }
        })
    };
}, TransactionsList );
