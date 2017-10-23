import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Tickets } from '../api/tickets';

import EmptyTableItem from './EmptyTableItem';
import TicketsListItem from './TicketsListItem';


export class TicketsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { tickets } = nextProps;
        console.log(this.props)
        console.log(nextProps)
        this.props.Session.set('tickets', tickets);

    }
    componentWillUnmount() {
        Meteor.subscribe('tickets').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom_Patient</Table.HeaderCell>
                            <Table.HeaderCell>Nom_Medecin</Table.HeaderCell>
                            <Table.HeaderCell>Police</Table.HeaderCell>
                            <Table.HeaderCell>Prestations</Table.HeaderCell>
                            <Table.HeaderCell>Net_a_payer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.tickets.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.tickets.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.tickets.length && !this.props.loading ? ( this.props.Session.get('tickets')  ).map( (ticket) => { return <TicketsListItem key={ticket._id} ticket={ticket}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

TicketsList.propTypes = {
    tickets: PropTypes.array
};

export default createContainer(() => {


    const ticketsHandle = Meteor.subscribe('tickets');
    const loading = !ticketsHandle.ready();

    return {
        Session,
        loading,
        tickets : Tickets.find({visible: true}).fetch().map((ticket)=>{
            return {
                ...ticket
            }
        })
    };
}, TicketsList );
