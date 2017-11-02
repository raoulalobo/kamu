import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Lits } from '../api/lits';

import EmptyTableItem from './EmptyTableItem';
import LitsListItem from './LitsListItem';


export class LitsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { lits } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('lits', lits);

    }
    componentWillUnmount() {
        Meteor.subscribe('lits').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Libelle</Table.HeaderCell>
                            <Table.HeaderCell>occupe</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.lits.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.lits.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.lits.length && !this.props.loading ? ( this.props.Session.get('lits')  ).map( (lit) => { return <LitsListItem key={lit._id} lit={lit}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

LitsList.propTypes = {
    lits: PropTypes.array
};

export default createContainer(() => {


    const litsHandle = Meteor.subscribe('lits');
    const loading = !litsHandle.ready();

    return {
        Session,
        loading,
        lits : Lits.find({visible: true}).fetch().map((lit)=>{
            return {
                ...lit
            }
        })
    };
}, LitsList );
