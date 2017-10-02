import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export default class UsrAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            error: '',
            username: '',
            email: '',
            password: '',
            telephone: ''
        };
    }
    onSubmit(e) {
        const { username ,email , password, telephone } = this.state;

        e.preventDefault();

        if ( username && email && password && telephone ) {

            Meteor.call('create.user', username.trim() ,email.trim() , password.trim(), { telephone : telephone.trim() } , (err) => {
                if (!err) {
                    this.handleClose();
                    Meteor.setTimeout(
                        ()=> Bert.alert( 'Utilisateur ajoute avec succes.', 'danger', 'growl-top-right', 'fa-check'  ), 600*3 )
                } else {
                    this.setState({ error: err.reason });
                }
            });

        } else {
            this.setState({ error: 'All field are required' });
        }
    }
    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeTelephone(e) {
        this.setState({
            telephone: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleClose() {
        this.setState({
            modalOpen: false,
            error: '',
            username: '',
            email: '',
            password: '',
            telephone: '',
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    render() {

        return (
            <div className="mrgnButton">

                <Modal
                    onSubmit={this.onSubmit.bind(this)}
                    open={this.state.modalOpen}
                    onClose={this.handleClose.bind(this)}
                    dimmer='blurring'
                    size='small'
                    trigger={<Button onClick={this.handleOpen.bind(this)} fluid basic color='blue'>+ Ajouter un  utilisateur</Button>}>
                    <Modal.Header>Ajouter un  utilisateur</Modal.Header>
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
                                <Form.Input label='username ...' value={this.state.username}
                                            onChange={this.onChangeUserName.bind(this)}/>
                                <Form.Input label='telephone ...' value={this.state.telephone}
                                            onChange={this.onChangeTelephone.bind(this)}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input label='Email ...' value={this.state.email}
                                            onChange={this.onChangeEmail.bind(this)}/>
                                <Form.Input type="password" label='Mot de passe ...' value={this.state.password}
                                            onChange={this.onChangePassword.bind(this)}/>
                            </Form.Group>
                            <Form.Button fluid basic color='blue'>Enregistrer</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
