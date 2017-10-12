import React , { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import Flatpickr from 'react-flatpickr';
import {fr} from 'flatpickr/dist/l10n/fr.js';
import { Table, Button, Modal , Form, Message, Icon } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';

export class PolicesListItem extends Component {

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
                <Table.Cell>{this.props.police.numeroPolice}</Table.Cell>
                <Table.Cell>{!!this.props.police.societe}</Table.Cell>
                <Table.Cell>{this.props.police.libelle}</Table.Cell>
                <Table.Cell>{this.props.police.tauxCouverture}</Table.Cell>
            </Table.Row>
        );
    }


};

PolicesListItem.propTypes = {
    police: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, PolicesListItem );
