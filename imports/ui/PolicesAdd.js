import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message, Dropdown } from 'semantic-ui-react'
import { Patients } from '../api/patients';

export class PolicesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            numeroPolice: '',
            societe: '',
            libelle: '',
            tauxCouverture: '',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { numeroPolice, societe , libelle , tauxCouverture, observations } = this.state;

        e.preventDefault();

        if ( numeroPolice && societe && libelle && tauxCouverture && observations ) {

            Meteor.call('polices.insert', numeroPolice , societe ,libelle , tauxCouverture , observations , (err, res) => {
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
            numeroPolice: '',
            societe: '',
            libelle: '',
            tauxCouverture: '',
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
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter un police</Button>}>
                <Modal.Header>Ajouter un police</Modal.Header>
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
                            <Form.Input label='Numero de police'
                                        name='numeroPolice'
                                        value={this.state.numeroPolice}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Societe'
                                        name='societe'
                                        value={this.state.societe}
                                        onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input label='Libelle'
                                        name='libelle'
                                        value={this.state.libelle}
                                        onChange={this.onChangeField.bind(this)}/>

                            <Form.Input label='Taux de couverture'
                                        name='TauxCouverture'
                                        value={this.state.tauxCouverture}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>


                        <Form.TextArea label='Observations'
                                       name='observations'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un police</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

PolicesAdd.propTypes = {

};

export default createContainer(() => {


}, PolicesAdd );