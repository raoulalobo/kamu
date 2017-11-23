import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Prestations } from '../api/prestations';

import EmptyTableItem from './EmptyTableItem';
import PrestationsListItem from './PrestationsListItem';


export class PrestationsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { prestations } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('prestations', prestations);

    }
    componentWillUnmount() {
        Meteor.subscribe('prestations').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Libelle</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.prestations.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.prestations.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.prestations.length && !this.props.loading ? ( this.props.Session.get('prestations')  ).map( (prestation) => { return <PrestationsListItem key={prestation._id} prestation={prestation}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

PrestationsList.propTypes = {
    prestations: PropTypes.array
};

export default createContainer(() => {


    const prestationsHandle = Meteor.subscribe('prestations');
    const loading = !prestationsHandle.ready();

    return {
        Session,
        loading,
        prestations : Prestations.find({visible: true}).fetch().map((prestation)=>{
            return {
                ...prestation
            }
        })
    };
}, PrestationsList );
