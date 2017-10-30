import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Grid, Header, Icon, Menu} from 'semantic-ui-react'


import MainMenu from "./MainMenu";
import ComposantsAdmin from "./ComposantsAdmin";
import ComposantsList from "./ComposantsList";


export class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: Meteor.user(),
            affichage: '',
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {affichage} = nextState;
        console.log(`state : ${affichage}`)
    }

    componentWillUpdate(nextProps, nextState) {
        const {affichage} = nextState;
        console.log(`state : ${affichage}`)
    }

    onChangeField(e, {name}) {
        this.setState({affichage: name});
        console.log(` affichage -> ${name}`)

    }

    render() {
        return (

            <div>

                <MainMenu/>
                <div className='mgnTopMainGrid'>

                </div>
                <div className='ourDropdown'>

                    <Grid divided>
                        <Grid.Row>
                            <Header as='h2'>
                                <Icon circular name='exchange'/>
                                <Header.Content>
                                    Gestion des Transactions
                                    <Header.Subheader>
                                        gerer la pharmacie , le materiel ...
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Row>

                        <Grid.Row>

                            <Grid.Column width={3}>

                                <Menu vertical>

                                    <Menu.Item name='transaction' onClick={this.onChangeField.bind(this)}>
                                        Utilisateurs
                                    </Menu.Item>

                                    <Menu.Item name='polices' onClick={this.onChangeField.bind(this)}>
                                        Polices Assurances
                                    </Menu.Item>

                                    <Menu.Item name='tarifs' onClick={this.onChangeField.bind(this)}>
                                        Prestations et tarifs
                                    </Menu.Item>

                                    <Menu.Item name='societes' onClick={this.onChangeField.bind(this)}>
                                        Entreprises
                                    </Menu.Item>

                                    <Menu.Item name='stocks' onClick={this.onChangeField.bind(this)}>
                                        Stocks et magasin
                                    </Menu.Item>

                                </Menu>

                            </Grid.Column>

                            <Grid.Column width={13}>
                                <Grid.Row>
                                    <ComposantsAdmin tag={this.state.affichage}/>
                                    <h2></h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <h2>*Barres de recherche et/ou filtres...</h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <h2></h2>
                                    <ComposantsList tag={this.state.affichage}/>
                                </Grid.Row>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                </div>

                <div className='mgnBotMainGrid'>

                </div>
            </div>

        );
    }

};


export default createContainer(() => {
    const user = Meteor.user() || null;
    return {
        user
    };
}, Transactions);