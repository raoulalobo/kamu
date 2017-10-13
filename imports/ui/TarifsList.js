import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Tarifs } from '../api/tarifs';

import EmptyTableItem from './EmptyTableItem';
import TarifsListItem from './TarifsListItem';


export class TarifsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { tarifs } = nextProps;
        console.log(this.props)
        console.log(nextProps)
        this.props.Session.set('tarifs', tarifs);

    }
    componentWillUnmount() {
        Meteor.subscribe('tarifs').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Libelle</Table.HeaderCell>
                            <Table.HeaderCell>Montant</Table.HeaderCell>
                            <Table.HeaderCell>desc</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.tarifs.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.tarifs.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.tarifs.length && !this.props.loading ? ( this.props.Session.get('tarifs')  ).map( (tarif) => { return <TarifsListItem key={tarif._id} tarif={tarif}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

TarifsList.propTypes = {
    tarifs: PropTypes.array
};

export default createContainer(() => {


    const tarifsHandle = Meteor.subscribe('tarifs');
    const loading = !tarifsHandle.ready();

    return {
        Session,
        loading,
        tarifs : Tarifs.find({visible: true}).fetch().map((tarif)=>{
            return {
                ...tarif
            }
        })
    };
}, TarifsList );
