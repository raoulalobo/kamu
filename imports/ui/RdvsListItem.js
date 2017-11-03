import React , { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Session } from 'meteor/session';
import { Table } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class RdvsListItem extends Component {

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
                <Table.Cell>{this.props.rdv.idTicket}</Table.Cell>
                <Table.Cell>{moment(this.props.rdv.dateHeureRdv).format('llll')}</Table.Cell>
                <Table.Cell>{this.props.rdv.motifRdv}</Table.Cell>
                <Table.Cell>{this.props.rdv.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

RdvsListItem.propTypes = {
    rdv: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, RdvsListItem );
