import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Rdvs } from '../api/rdvs';

import EmptyTableItem from './EmptyTableItem';
import RdvsListItem from './RdvsListItem';


export class RdvsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { rdvs } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('rdvs', rdvs);

    }
    componentWillUnmount() {
        Meteor.subscribe('rdvs').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ticket_Id</Table.HeaderCell>
                            <Table.HeaderCell>Date Rendez-vous</Table.HeaderCell>
                            <Table.HeaderCell>Motif</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.rdvs.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.rdvs.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.rdvs.length && !this.props.loading ? ( this.props.Session.get('rdvs')  ).map( (rdv) => { return <RdvsListItem key={rdv._id} rdv={rdv}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

RdvsList.propTypes = {
    rdvs: PropTypes.array
};

export default createContainer(() => {


    const rdvsHandle = Meteor.subscribe('rdvs');
    const loading = !rdvsHandle.ready();

    return {
        Session,
        loading,
        rdvs : Rdvs.find({visible: true}).fetch().map((rdv)=>{
            return {
                ...rdv
            }
        })
    };
}, RdvsList );
