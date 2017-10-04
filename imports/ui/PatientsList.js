import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Patients } from '../api/patients';

import EmptyTableItem from './EmptyTableItem';
import PatientsListItem from './PatientsListItem';


export class PatientsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { patients } = nextProps;
        console.log(this.props)
        console.log(nextProps)
        this.props.Session.set('patients', patients);

    }
    componentWillUnmount() {
        Meteor.subscribe('patients').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Noms</Table.HeaderCell>
                            <Table.HeaderCell>Genre</Table.HeaderCell>
                            <Table.HeaderCell>Telephones</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.patients.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.patients.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.patients.length && !this.props.loading ? ( this.props.Session.get('patients')  ).map( (patient) => { return <PatientsListItem key={patient._id} patient={patient}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

PatientsList.propTypes = {
    patients: PropTypes.array
};

export default createContainer(() => {
    

    const patientsHandle = Meteor.subscribe('patients');
    const loading = !patientsHandle.ready();

    return {
        Session,
        loading,
        patients : Patients.find({visible: true}).fetch().map((patient)=>{
            return {
                ...patient
            }
        })
    };
}, PatientsList );
