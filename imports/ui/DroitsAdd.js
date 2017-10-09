import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export default class DroitsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            error: '',
            intitule: '',
            desc: '',
            obs: '',
        };
    }
    onSubmit(e) {
        const { intitule ,desc , obs } = this.state;

        e.preventDefault();

        if ( intitule && desc && obs  ) {

            Meteor.call('droits.insert', intitule.trim() ,obs , desc , (err) => {
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
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`)
    }
    handleClose() {
        this.setState({
            modalOpen: false,
            error: '',
            intitule: '',
            desc: '',
            obs: '',
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
                    trigger={<Button onClick={this.handleOpen.bind(this)} fluid basic color='blue'>+ Ajouter un droit</Button>}>
                    <Modal.Header>Ajouter un droit</Modal.Header>
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
                                <Form.Input label='Intitule ...'
                                            name='intitule'
                                            value={this.state.intitule}
                                            onChange={this.onChangeField.bind(this)}/>
                            </Form.Group>
                            <Form.TextArea label='Description'
                                           name='desc'
                                           value={this.state.desc}
                                           onChange={this.onChangeField.bind(this)}/>
                            <Form.TextArea label='Observations'
                                           name='obs'
                                           value={this.state.obs}
                                           onChange={this.onChangeField.bind(this)}/>
                            <Form.Button fluid basic color='blue'>Enregistrer</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
