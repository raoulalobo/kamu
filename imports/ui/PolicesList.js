import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Polices } from '../api/polices';

import EmptyTableItem from './EmptyTableItem';
import PolicesListItem from './PolicesListItem';


export class PolicesList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { polices } = nextProps;
        console.log(this.props)
        console.log(nextProps)
        this.props.Session.set('polices', polices);

    }
    componentWillUnmount() {
        Meteor.subscribe('polices').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell>Numero_Police</Table.HeaderCell>
                            <Table.HeaderCell>Societe</Table.HeaderCell>
                            <Table.HeaderCell>Plafond</Table.HeaderCell>
                            <Table.HeaderCell>Taux_Couverture (%)</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.polices.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.polices.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.polices.length && !this.props.loading ? ( this.props.Session.get('polices')  ).map( (police) => { return <PolicesListItem key={police._id} police={police}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

PolicesList.propTypes = {
    polices: PropTypes.array
};

export default createContainer(() => {


    const policesHandle = Meteor.subscribe('polices');
    const loading = !policesHandle.ready();

    return {
        Session,
        loading,
        polices : Polices.find({visible: true}).fetch().map((police)=>{
            return {
                ...police
            }
        })
    };
}, PolicesList );
