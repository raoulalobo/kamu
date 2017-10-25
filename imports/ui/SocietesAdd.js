import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export class SocietesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            societe: '',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { societe , observations } = this.state;

        e.preventDefault();

        if ( societe &&  observations ) {

            const code = societe.trim().toLowerCase().replace(/[ ,']/g, "_")
            Meteor.call('societes.insert',  societe ,code , observations , (err, res) => {
                if (!err) {
                    this.handleClose();
                    Bert.alert( `enregistrement ${res} ajoute avec succes.`, 'danger', 'growl-top-right', 'fa-check'  )
                } else {
                    this.setState({ error: err.reason });
                }
            });

        } else {
            this.setState({ error: 'All field are required' });
        }
    }
    handleClose() {
        this.setState({
            modalOpen: false,
            societe: '',
            observations: '',
            error: ''
        });
    }

    handleOpen() {
        this.setState( { modalOpen: true } );
    }

    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`)
    }

    componentWillReceiveProps(nextProps) {


    }

    componentWillUnmount() {

    }
    render() {

        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                dimmer='blurring'
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 societe</Button>}>
                <Modal.Header>Ajouter 01 societe</Modal.Header>
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

                            <Form.Input label='Societe'
                                        name='societe'
                                        value={this.state.societe}
                                        onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        <Form.TextArea label='Observations'
                                       name='observations'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un societe</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

SocietesAdd.propTypes = {

};

export default createContainer(() => {

    return {
        Session
    };

}, SocietesAdd );