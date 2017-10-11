import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Grid , Header, Icon , Label, Menu  } from 'semantic-ui-react'


//import DroitsList from "./DroitsList";
//import DroitsAdd from "./DroitsAdd";

import MainMenu from "./MainMenu";
import UsrsList from "./UsrsList";
import UsrAdd from "./UsrAdd";
import PolicesAdd from "./PolicesAdd";



export class Usrs extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            currentUser : Meteor.user(),
            affichage: '',
        }
    }
    componentWillReceiveProps(nextProps,nextState) {
        /*const { user } = nextProps;
        if (user) {
            this.setState({currentUser: user._id});
        }*/
        const { affichage } = nextState;
        //console.log(`props : ${nextProps}`)
        console.log(`state : ${affichage}`)
    }
    componentWillUpdate(nextProps, nextState){
        const { affichage } = nextState;
        //console.log(`props : ${nextProps}`)
        console.log(`state : ${affichage}`)
    }
    onChangeField(e, { name }) {
        this.setState( { affichage : name });
        console.log(` affichage -> ${name}`)

    }
    adminLevel() {
        if ( Roles.userIsInRole(this.state.currentUser, 'admin') ) {
            return (
                <div>

                    <MainMenu/>
                    <div className='mgnTopMainGrid'>

                    </div>
                    <div className='ourDropdown'>

                        <Grid divided>
                            <Grid.Row>
                                <Header as='h2'>
                                    <Icon circular name='settings' />
                                    <Header.Content>
                                        Gestion des parametres
                                        <Header.Subheader>
                                            gerer les utilisateurs, polices, etc ...
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Row>

                            <Grid.Row>

                                <Grid.Column width={3}>

                                    {/*<DroitsAdd/>*/}
                                    {/*<DroitsList/>*/}

                                    <Menu vertical>

                                        <Menu.Item name='users' onClick={this.onChangeField.bind(this)}>
                                            <Label color='teal'>1</Label>
                                            Utilisateurs
                                        </Menu.Item>

                                        <Menu.Item name='polices' onClick={this.onChangeField.bind(this)}>
                                            <Label>51</Label>
                                            Polices Assurances
                                        </Menu.Item>

                                        <Menu.Item name='updates' onClick={this.onChangeField.bind(this)}>
                                            <Label>1</Label>
                                            Chambres
                                        </Menu.Item>

                                        <Menu.Item name='updates' onClick={this.onChangeField.bind(this)}>
                                            <Label>1</Label>
                                            Ambulances
                                        </Menu.Item>

                                    </Menu>

                                </Grid.Column>

                                <Grid.Column width={13}>
                                    <Grid.Row>
                                        <UsrAdd/>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <h2>*SearchBar if needed</h2>
                                    </Grid.Row>
                                    <Grid.Row >
                                        <h2></h2>
                                        <UsrsList/>
                                    </Grid.Row>
                                </Grid.Column>

                            </Grid.Row>

                        </Grid>

                    </div>

                    <div className='mgnBotMainGrid'>

                    </div>
                </div>
            )
        } else {
            return (
                <div>

                    <MainMenu/>
                    <div className='mgnTopMainGrid'>

                    </div>
                    <Grid container divided>
                        <Grid.Row>
                            <Header as='h2'>
                                <Icon circular name='hourglass three' />
                                <Header.Content>
                                    Verification du compte, ceci peut prendre quelques secondes ... Ou alors vous jouez au malin
                                    <Header.Subheader>
                                        contacter le service informatique -dsi@finexsvoyages.net- si apres 300 secondes  vous avez pas acces aux donnees .
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Row>

                    </Grid>
                    <div className='mgnBotMainGrid'>

                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.adminLevel()}
            </div>
        );
    }

};


export default createContainer(() => {
    const user = Meteor.user() || null;
    return {
        user
    };
}, Usrs);