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
            confirmPassword: '',
            telephone: '',
            specialites:'',
        };
    }
    onSubmit(e) {
        const { username ,email , password, telephone, specialites, confirmPassword } = this.state;

        e.preventDefault();

        if ( username && email && password && telephone && specialites && confirmPassword ) {

            if ( password === confirmPassword ) {

                Meteor.call('create.user', username.trim() ,email.trim() , password.trim(), { telephone : telephone.trim(),specialites },  specialites  , (err) => {
                    if (!err) {
                        this.handleClose();
                        Meteor.setTimeout(
                            ()=> Bert.alert( 'Utilisateur ajoute avec succes.', 'danger', 'growl-top-right', 'fa-check'  ), 600*3 )
                    } else {
                        this.setState({ error: err.reason });
                    }
                });

            } else {
                this.setState({ error: 'Mot de passe differents' });
            }



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
    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log( `${name} -> ${value}`)
    }
    handleClose() {
        this.setState({
            modalOpen: false,
            error: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            telephone: '',
            specialites: '',
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    render() {
        const optionsSpecialites = [
            {key:'manager',text:'administration-manager',value:'MANAGER'},
            {key:'caisse',text:'administration-caisse',value:'CAISSE'},
            {key:'generaliste',text:'medecin-generaliste',value:'GENERALISTE'},
            {key:'pediatre',text:'medecin-pediatre',value:'PEDIATRE'},
            {key:'infirmier',text:'infirmier',value:'INFIRMIER'},
        ];
        return (
            <div className="mrgnButton">

                <Modal
                    closeOnRootNodeClick={false}
                    onSubmit={this.onSubmit.bind(this)}
                    open={this.state.modalOpen}
                    onClose={this.handleClose.bind(this)}
                    dimmer='blurring'
                    size='small'
                    trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01  utilisateur</Button>} closeIcon>
                    <Modal.Header>Ajouter 01  utilisateur</Modal.Header>
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
                                <Form.Dropdown
                                    label='Specialites'
                                    minCharacters={0}
                                    name='specialites'
                                    placeholder='Selectionnez 01 specialite'
                                    search
                                    selection
                                    options={optionsSpecialites}
                                    onChange={this.onChangeField.bind(this)}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input type="password" label='Mot de passe ...' value={this.state.password}
                                            onChange={this.onChangePassword.bind(this)}/>
                                <Form.Input type="password" label='Confirmer le mot de passe ...' value={this.state.confirmPassword}
                                            onChange={this.onChangeConfirmPassword.bind(this)}/>
                            </Form.Group>
                            <Form.Button fluid basic color='blue'>Enregistrer</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
