import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class TransactionsListItem extends Component {

    constructor (props) {
        super(props);
        this.state = {
            currentUser : Meteor.user(),
        }
    }
    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        if (user) {
            this.setState({currentUser: user._id});
        }
    }

    render () {
        return (
            <Table.Row error={this.props.transaction.type === 'sorties'} positive={this.props.transaction.type === 'entrees'}>
                <Table.Cell>{this.props.transaction.produit}</Table.Cell>
                <Table.Cell>{this.props.transaction.type}</Table.Cell>
                <Table.Cell>{this.props.transaction.qtte}</Table.Cell>
                <Table.Cell>{this.props.transaction.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

TransactionsListItem.propTypes = {
    transaction: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, TransactionsListItem );
