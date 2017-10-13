import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class TicketsListItem extends Component {

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
            <Table.Row>
                <Table.Cell>{this.props.ticket.nomPatient}</Table.Cell>
                <Table.Cell>{this.props.ticket.nomMedecin}</Table.Cell>
                <Table.Cell>{this.props.ticket.polices}</Table.Cell>
                <Table.Cell>{this.props.ticket.tarifs}</Table.Cell>
                <Table.Cell>{this.props.ticket.montant}</Table.Cell>
            </Table.Row>
        );
    }


};

TicketsListItem.propTypes = {
    ticket: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, TicketsListItem );
