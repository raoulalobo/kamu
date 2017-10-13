import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export class TarifsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            libelle: '',
            montant: '',
            desc: '',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { libelle, montant , desc, observations } = this.state;

        e.preventDefault();

        if ( libelle && montant && desc && observations ) {

            Meteor.call('tarifs.insert', libelle.trim().toUpperCase() , parseInt( montant.trim() ) , desc , observations , (err, res) => {
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
            libelle: '',
            montant: '',
            desc: '',
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
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                dimmer='blurring'
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 tarif</Button>}>
                <Modal.Header>Ajouter 01 tarif</Modal.Header>
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
                            <Form.Input label='Libelle'
                                        name='libelle'
                                        value={this.state.libelle}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Montant'
                                        name='montant'
                                        value={this.state.montant}
                                        onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input label='Description'
                                        name='desc'
                                        value={this.state.desc}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>


                        <Form.TextArea label='Observations'
                                       name='observations'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un tarif</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

TarifsAdd.propTypes = {

};

export default createContainer(() => {

    return {
        Session
    };

}, TarifsAdd );