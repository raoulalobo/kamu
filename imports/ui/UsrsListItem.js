import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Grid, List , Button, Dropdown } from 'semantic-ui-react';

export class UsrsListItem extends React.Component{
    onDeleteButton(){
        const changeState = confirm('Vous confirmez la suppression du user '+this.props.usr.emails[0].address.split('@')[0]+' ? ');
        if (changeState) {
            this.props.call('delete.user', this.props.usr._id , (err , res)=>{
                if (!err) {
                    Bert.alert( 'Suppression effectuee.', 'danger', 'growl-top-right', 'fa-check'  )
                }
            } );
        }
    }
    onClickButton(e, { name}) {
        console.log(`${name}`);
        var confirmation = confirm('Role of ('+this.props.usr.emails[0].address+') will be modified. Confirm ?');
        if (confirmation) {
            this.props.call('add.role', this.props.usr._id,`${name}`);
        }
    }
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`)
        var confirmation = confirm('Role of ('+this.props.usr.emails[0].address+') will be modified. Confirm ?');
        if (confirmation) {
            this.props.call('add.role', this.props.usr._id,`${value}`);
        }

    }
    render() {

        const options = [
            { key: 'medecin', text: 'Medecin', value: 'medecin' },
            { key: 'caisse', text: 'Caisse', value: 'caisse' },
            { key: 'infirmier', text: 'Infirmier', value: 'infirmier' },
        ];

        return (
            <List.Item>
                <List.Content floated='right'>
                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown
                                    minCharacters={0}
                                    name='role'
                                    placeholder='Select role'
                                    search
                                    selection
                                    options={options}
                                    defaultValue={this.props.usr.roles}
                                    onChange={this.onChangeField.bind(this)} />
                                <Button
                                    basic
                                    color='red'
                                    icon='remove'
                                    onClick={this.onDeleteButton.bind(this)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </List.Content>
                {/*<Image avatar src='/assets/images/avatar/small/lena.png' />*/}
                <List.Content>

                    {/*<List.Header>{this.props.usr.emails[0].address.split('@')[0]} / { !!this.props.usr.profile ? (this.props.usr.profile.specialites || 'Pas de specialite')  : 'Pas de profil'} / { !!this.props.usr.profile ? (this.props.usr.profile.telephone || 'Pas de telephone') : 'Pas de profil'}</List.Header>*/}

                    <List.Header>{this.props.usr.username} / { !!this.props.usr.profile ? (this.props.usr.profile.specialites || 'Pas de specialite')  : 'Pas de profil'} / { !!this.props.usr.profile ? (this.props.usr.profile.telephone || 'Pas de telephone') : 'Pas de profil'}</List.Header>
                    {!!this.props.usr.roles ? 'Role: '+this.props.usr.roles : 'Aucun role'}
                </List.Content>
            </List.Item>
        );
    }

};

UsrsListItem.propTypes = {
    usr: PropTypes.object,
    Session: PropTypes.object
};

export default createContainer(() => {
    return {
        Session,
        call: Meteor.call,
    };
}, UsrsListItem);
