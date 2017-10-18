import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Stocks } from '../api/stocks';

import EmptyTableItem from './EmptyTableItem';
import StocksListItem from './StocksListItem';


export class StocksList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { stocks } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('stocks', stocks);

    }
    componentWillUnmount() {
        Meteor.subscribe('stocks').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Libelle</Table.HeaderCell>
                            <Table.HeaderCell>Quantite</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.stocks.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.stocks.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.stocks.length && !this.props.loading ? ( this.props.Session.get('stocks')  ).map( (stock) => { return <StocksListItem key={stock._id} stock={stock}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

StocksList.propTypes = {
    stocks: PropTypes.array
};

export default createContainer(() => {


    const stocksHandle = Meteor.subscribe('stocks');
    const loading = !stocksHandle.ready();

    return {
        Session,
        loading,
        stocks : Stocks.find({visible: true}).fetch().map((stock)=>{
            return {
                ...stock
            }
        })
    };
}, StocksList );
