import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Hostos } from '../api/hospitalisations';

import EmptyTableItem from './EmptyTableItem';
import HostosListItem from './HostosListItem';


export class HostosList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { hostos } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('hostos', hostos);

    }
    componentWillUnmount() {
        Meteor.subscribe('hostos').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ticket_Id</Table.HeaderCell>
                            <Table.HeaderCell>Motifs</Table.HeaderCell>
                            <Table.HeaderCell>lit</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.hostos.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.hostos.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.hostos.length && !this.props.loading ? ( this.props.Session.get('hostos')  ).map( (hosto) => { return <HostosListItem key={hosto._id} hosto={hosto}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

HostosList.propTypes = {
    hostos: PropTypes.array
};

export default createContainer(() => {


    const hostosHandle = Meteor.subscribe('hostos');
    const loading = !hostosHandle.ready();

    return {
        Session,
        loading,
        hostos : Hostos.find({visible: true}).fetch().map((hosto)=>{
            return {
                ...hosto
            }
        })
    };
}, HostosList );
