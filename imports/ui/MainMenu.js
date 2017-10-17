import { Meteor } from 'meteor/meteor';
import { Link , browserHistory} from 'react-router';
import React, { Component } from 'react';
import { Grid , Menu , Message , Modal , Form , Icon } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export class MainMenu extends Component {

    constructor (props) {
        super(props);
        this.state = {
            error: '',
            newPwd : '',
            old : '',
            currentUser : Meteor.user(),
            activeItem : '',
            menuColor: 'blue'
        }
    }
    componentDidMount() {
        Session.set('activeItem', browserHistory.getCurrentLocation().pathname );
        //console.log( Session.get('activeItem') )
    }
    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        if (user) {
            this.props.Session.set('userId', user._id);
            this.setState({currentUser: user._id});
        }
        //console.log(nextProps);
        //console.log(this.props);
    }
    shouldComponentUpdate(nextProps, nextState){
        //console.log(nextProps);
        //console.log(nextState);
        return true;
    }
    onSubmit(e) {
        const { old , newPwd } = this.state;

        e.preventDefault();

        if ( old && newPwd ) {

            Accounts.changePassword( old , newPwd , (err) => {
                if (!err) {
                    this.handleClose();
                    //console.log('Utilisateur ajoute');
                } else {
                    this.setState({ error: err.reason });
                }
            });

        } else {
            this.setState({ error: 'All field are required' });
        }

    }
    onChangeNewPwd(e) {
        this.setState({
            newPwd: e.target.value
        });
    }
    onChangeOldPwd(e) {
        this.setState({
            old: e.target.value
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    handleClose() {
        this.setState({
            modalOpen: false,
            error: '',
            old: '',
            newPwd: ''
        });
    }
    adminMenu() {
        if ( Roles.userIsInRole(this.state.currentUser, 'admin') ) {
            const { activeItem } = this.props;
            return (

                <Grid.Row only='mobile tablet computer'>

                    <Menu.Item
                        as={Link}
                        to='/users'
                        name='admin'
                        active={activeItem === '/admin'}>
                        <Icon name='settings' />
                        Admin
                    </Menu.Item>

                    <Menu.Item
                        as={Link}
                        to='/patients'
                        name='patients'
                        active={activeItem === '/patients'}>
                        <Icon name='users' />
                        Patients
                    </Menu.Item>

                    <Menu.Item
                        as={Link}
                        to='/tickets'
                        name='tickets'
                        active={activeItem === '/tickets'}>
                        <Icon name='ticket' />
                        Tickets
                    </Menu.Item>

                    <Menu.Item
                        as={Link}
                        to='/fiches-medicales'
                        name='suiviMedical'
                        active={activeItem === '/fiches-medicales'}>
                        <Icon name='treatment' />
                        Suivi Medical
                    </Menu.Item>

                    <Menu.Item
                        as={Link}
                        to='/'
                        name='pharmacie'
                        active={activeItem === '/pharmacie'}>
                        <Icon name='first aid' />
                        Pharmacie
                    </Menu.Item>

                    <Menu.Item
                        as={Link}
                        to='/'
                        name='caisse'
                        active={activeItem === '/caisse'}>
                        <Icon name='shop' />
                        Caisse
                    </Menu.Item>


                </Grid.Row>
            )
        } else if ( Roles.userIsInRole(this.state.currentUser, 'infirmier') ) {

            const { activeItem } = this.props;
            return (

                <Grid.Row only='mobile tablet computer'>

                    <Menu.Item
                        as={Link}
                        to='/tickets'
                        name='tickets'
                        active={activeItem === '/tickets'}>
                        <Icon name='ticket' />
                        Tickets
                    </Menu.Item>

                    <Menu.Item
                        as={Link}
                        to='/fiches-medicales'
                        name='suiviMedical'
                        active={activeItem === '/fiches-medicales'}>
                        <Icon name='treatment' />
                        Suivi Medical
                    </Menu.Item>

                </Grid.Row>
            )
        } else if ( Roles.userIsInRole(this.state.currentUser, 'medecin') ) {
            const { activeItem } = this.props;
            return (
                <Grid.Row only='mobile tablet computer'>

                    <Menu.Item
                        as={Link}
                        to='/fiches-medicales'
                        name='suiviMedical'
                        active={activeItem === '/fiches-medicales'}>
                        <Icon name='treatment' />
                        Suivi Medical
                    </Menu.Item>

                </Grid.Row>


            )
        }
    }
    handleItemClick(e, { name }) {
        // this.setState( { activeItem: name } );
        Session.set('activeItem', name)
    }
    render() {
        const { menuColor } = this.state;

        return (
            <div>
                <Menu size='huge' icon='labeled' color={menuColor} inverted>
                    <Grid>
                        {this.adminMenu()}
                    </Grid>


                    <Menu.Menu position='right'>

                        <Modal
                            onSubmit={this.onSubmit.bind(this)}
                            open={this.state.modalOpen}
                            onClose={this.handleClose.bind(this)}
                            dimmer='blurring'
                            size='small'
                            trigger={<Menu.Item onClick={this.handleOpen.bind(this)}><Icon name='edit' />Modifier</Menu.Item>}>
                            <Modal.Header>Changer votre mot de passe </Modal.Header>
                            <Modal.Content >
                                {this.state.error ?
                                    <Message negative>
                                        <Message.Header>Desole , nous ne pouvons effectuer cet enregistrement</Message.Header>
                                        <p>{this.state.error}</p>
                                    </Message>
                                    :
                                    undefined}
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input type="password" label='Ancien mot de passe' value={this.state.old}
                                                    onChange={this.onChangeOldPwd.bind(this)}/>
                                        <Form.Input type="password" label='Nouveau mot de passe' value={this.state.newPwd}
                                                    onChange={this.onChangeNewPwd.bind(this)}/>
                                    </Form.Group>
                                    <Form.Button fluid basic color='blue'>Valider</Form.Button>
                                </Form>
                            </Modal.Content>
                        </Modal>

                        <Menu.Item name='Se Deconnecter' onClick={() => Accounts.logout()} >
                            <Icon name='log out' />
                            LogOut
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {this.props.children}
            </div>

        )
    }
}

export default createContainer(() => {
    const activeItem = Session.get('activeItem');
    const user = Meteor.user() || undefined ;
    return {
        Session,
        user,
        activeItem
    };
}, MainMenu);