import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Typeprestations } from '../api/typeprestations';

import EmptyTableItem from './EmptyTableItem';
import TypePrestationsListItem from './TypePrestationsListItem';


export class TypePrestationsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { typeprestations } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('typeprestations', typeprestations);

    }
    componentWillUnmount() {
        Meteor.subscribe('typeprestations').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell>Code</Table.HeaderCell>
                            <Table.HeaderCell>Libelle</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.typeprestations.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.typeprestations.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.typeprestations.length && !this.props.loading ? ( this.props.Session.get('typeprestations')  ).map( (typeprestation) => { return <TypeprestationsListItem key={typeprestation._id} typeprestation={typeprestation}/>; } ) : undefined }
                    </Table.Body>
                </Table>
            </div>
        );
    }
};

TypePrestationsList.propTypes = {
    typeprestations: PropTypes.array
};

export default createContainer(() => {


    const typeprestationsHandle = Meteor.subscribe('typeprestations');
    const loading = !typeprestationsHandle.ready();

    return {
        Session,
        loading,
        typeprestations : Typeprestations.find({visible: true}).fetch().map((typeprestation)=>{
            return {
                ...typeprestation
            }
        })
    };
}, TypePrestationsList );
