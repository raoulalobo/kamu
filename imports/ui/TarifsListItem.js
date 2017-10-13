import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class TarifsListItem extends Component {

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
                <Table.Cell>{this.props.tarif.libelle}</Table.Cell>
                <Table.Cell>{this.props.tarif.montant}</Table.Cell>
                <Table.Cell>{this.props.tarif.desc}</Table.Cell>
                <Table.Cell>{this.props.tarif.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

TarifsListItem.propTypes = {
    tarif: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, TarifsListItem );
