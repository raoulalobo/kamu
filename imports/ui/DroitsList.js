import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { List } from 'semantic-ui-react'

import { Droits } from '../api/droits';
import DroitsListItem from './DroitsListItem';
import EmptyListItem from './EmptyListItem.js';

export class DroitsList extends React.Component{
    componentWillReceiveProps(nextProps) {

        const { droits } = nextProps;
        this.props.Session.set('droits', droits);

    }
    render(){
        return (
            <List celled selection verticalAlign='middle'>
                { this.props.droits.length === 0 ? <EmptyListItem text="No Item"/> : undefined }
                { this.props.loading && !!this.props.droits.length ? <EmptyListItem text="Loading Data..."/>  : undefined }
                {!!this.props.droits.length && !this.props.loading ? ( this.props.Session.get('droits') ).map((droit) => {
                    return <DroitsListItem key={droit._id} droit={droit}/>;
                }) : undefined }
            </List>
        );
    }
};

DroitsList.propTypes = {
    droits: PropTypes.array
};

export default createContainer(() => {

    const patientsHandle = Meteor.subscribe('droits');
    const loading = !patientsHandle.ready();
    


    let reactiveSearch = {} ;

    return {
        Session,
        loading,
        droits: Droits.find().fetch()
    };
}, DroitsList);
