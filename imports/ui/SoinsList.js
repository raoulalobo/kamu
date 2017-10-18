import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'


import { Soins } from '../api/soins';

import EmptyTableItem from './EmptyTableItem';
import SoinsListItem from './SoinsListItem';


export class SoinsList extends React.Component{
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        const { soins } = nextProps;
        console.log(this.props);
        console.log(nextProps);
        this.props.Session.set('soins', soins);

    }
    componentWillUnmount() {
        Meteor.subscribe('soins').stop()
    }
    render(){
        return (
            <div>
                <Table selectable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ticket_Id</Table.HeaderCell>
                            <Table.HeaderCell>Actes</Table.HeaderCell>
                            <Table.HeaderCell>Observations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.props.soins.length === 0 ? <EmptyTableItem text="No Items, if is an unexpected result please contact the admin"/> : undefined }
                        { this.props.loading && !!this.props.soins.length ? <EmptyTableItem text="Loading Data , please wait ..."/>  : undefined }
                        {!!this.props.soins.length && !this.props.loading ? ( this.props.Session.get('soins')  ).map( (soin) => { return <SoinsListItem key={soin._id} soin={soin}/>; } ) : undefined }

                    </Table.Body>
                </Table>
            </div>
        );
    }
};

SoinsList.propTypes = {
    soins: PropTypes.array
};

export default createContainer(() => {


    const soinsHandle = Meteor.subscribe('soins');
    const loading = !soinsHandle.ready();

    return {
        Session,
        loading,
        soins : Soins.find({visible: true}).fetch().map((soin)=>{
            return {
                ...soin
            }
        })
    };
}, SoinsList );
