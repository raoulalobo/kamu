import React , { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import Flatpickr from 'react-flatpickr';
import {fr} from 'flatpickr/dist/l10n/fr.js';
import { Table, Button, Modal , Form, Message, Icon } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';

export class PatientsListItem extends Component {

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
                <Table.Cell>{moment().diff(moment(this.props.patient.dateNaissance),'years')}</Table.Cell>
                <Table.Cell>{this.props.patient.nomEtPrenom}</Table.Cell>
                <Table.Cell>{!!this.props.patient.genre ? this.props.patient.genre : 'RAS'}</Table.Cell>
                <Table.Cell>{this.props.patient.tel}</Table.Cell>
                <Table.Cell>{this.props.patient.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

PatientsListItem.propTypes = {
    patient: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, PatientsListItem );
