import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Grid, List , Button } from 'semantic-ui-react';

export class DroitsListItem extends React.Component{

    render() {
        return (
            <List.Item>
                <List.Content floated='right'>
                    <Grid columns='equal'></Grid>
                </List.Content>
                <List.Content>
                    <List.Header>{this.props.droit.intitule}</List.Header>
                </List.Content>
            </List.Item>
        );
    }

};

DroitsListItem.propTypes = {
    droit: PropTypes.object,
    Session: PropTypes.object
};

export default createContainer(() => {
    return {
        Session,
        call: Meteor.call,
    };
}, DroitsListItem);
