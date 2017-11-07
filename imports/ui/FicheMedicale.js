import React  from 'react';
import { Grid , Header, Icon ,  Menu } from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data';
import MainMenu from './MainMenu';
import ComposantsAdmin from "./ComposantsAdmin";
import ComposantsList from "./ComposantsList";


export class FicheMedicales extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            currentUser : Meteor.user(),
            affichage: 'fiches',
        }
    }
    componentWillMount(nextState){
        //console.log(nextState);
        //console.log( `-> ${this.props.Session.get('position')}` );
    }
    componentDidMount(nextState){
        //console.log(nextState);
        //console.log( `-> ${this.props.Session.get('position')}` );
    }
    componentWillReceiveProps(nextProps,nextState) {
        const { affichage } = nextState;
        console.log(nextState);
    }
    componentWillUpdate(nextProps, nextState){
        const { affichage } = nextState;
        console.log(nextState);
    }
    onChangeField(e, { name }) {
        this.setState( { affichage : name });
    }
    render(){
        return (
            <div>
                <MainMenu/>

                <div className='mgnTopMainGrid'>

                </div>

                <div className='ourDropdown'>
                    <Grid  divided>
                        <Grid.Row>
                            <Header as='h2'>
                                <Icon circular name='treatment' />
                                <Header.Content>
                                    Enregistrement des ficheMedicales
                                    <Header.Subheader>
                                        Note du KAMU : Apres insertion il sera impossible de supprimer !
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Menu vertical>

                                    <Menu.Item name='fiches' onClick={this.onChangeField.bind(this)}>
                                        Fiches Medicales
                                    </Menu.Item>

                                    <Menu.Item name='soins' onClick={this.onChangeField.bind(this)}>
                                        Soins
                                    </Menu.Item>

                                    <Menu.Item name='rdvs' onClick={this.onChangeField.bind(this)}>
                                        Rendez-vous
                                    </Menu.Item>

                                    <Menu.Item name='hostos' onClick={this.onChangeField.bind(this)}>
                                        Hospitalisations
                                    </Menu.Item>

                                </Menu>
                            </Grid.Column>

                            <Grid.Column width={13}>
                                <Grid.Row>
                                    <ComposantsAdmin  tag={this.state.affichage} />
                                    <h2> </h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <h2>*Barres de recherche et/ou filtres...</h2>
                                </Grid.Row>
                                <Grid.Row >
                                    <h2> </h2>
                                    <ComposantsList tag={this.state.affichage}/>
                                </Grid.Row>
                            </Grid.Column>


                        </Grid.Row>

                    </Grid>
                </div>

                <div className='mgnBotMainGrid'>

                </div>

            </div>
        )
    }

};

FicheMedicales.propTypes = {
};

export default createContainer(() => {

    return {
        Session
    };

}, FicheMedicales);
