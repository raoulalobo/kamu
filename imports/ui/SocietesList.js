import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Societes } from '../api/societes';

import EmptyTableItem from './EmptyTableItem';
import SocietesListItem from './SocietesListItem';


export class SocietesList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { societes } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('societes', societes);

    }
    componentWillUnmount() {
        Meteor.subscribe('societes').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Societe</Table.HeaderCell>
                            <Table.HeaderCell>code</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.societes.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.societes.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.societes.length && !this.props.loading ? ( this.props.Session.get('societes')  ).map( (societe) => { return <SocietesListItem key={societe._id} societe={societe}/>; } ) : undefined }
                    </Table.Body>
                </Table>
            </div>
        );
    }
};

SocietesList.propTypes = {
    societes: PropTypes.array
};

export default createContainer(() => {


    const societesHandle = Meteor.subscribe('societes');
    const loading = !societesHandle.ready();

    return {
        Session,
        loading,
        societes : Societes.find({visible: true}).fetch().map((societe)=>{
            return {
                ...societe
            }
        })
    };
}, SocietesList );
