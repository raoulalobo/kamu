import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message, Dropdown } from 'semantic-ui-react'
import { Patients } from '../api/patients';
import { Polices } from '../api/polices';

export class TicketsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            patients: '',
            medecins: '',
            assure: '',
            societe: '',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { patients, medecins , assure , societe, observations } = this.state;

        e.preventDefault();

        if ( patients && medecins && assure && societe && observations ) {

            Meteor.call('tickets.insert', patients , medecins ,assure , societe , observations , (err, res) => {
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
            patients: '',
            medecins: '',
            assure: '',
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

        const { patients } = nextProps;
        console.log(this.props)
        console.log(nextProps)

    }
    componentWillUnmount() {
        Meteor.subscribe('patients').stop()
        Meteor.subscribe('polices').stop()
    }
    render() {
        const optionsPatients = this.props.patients;
        const optionsUsers = this.props.usrs;
        const optionsPolices = this.props.polices;
        const optionsAssurances = [
            { key: 'OUI', text: 'Nuits', value: 'OUI' },
            { key: 'NON', text: 'Jours', value: 'NON' },
            { key: 'MAYBE', text: 'Feries', value: 'NON' },
        ];
        return (

            <Modal
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter un ticket</Button>}>
                <Modal.Header>Ajouter un ticket</Modal.Header>
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
                            <Form.Dropdown
                                        label='Patients'
                                        minCharacters={0}
                                        name='patients'
                                        placeholder='Selectionnez 01 patient'
                                        search
                                        selection
                                        options={optionsPatients}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Dropdown
                                label='Medecins'
                                minCharacters={0}
                                name='medecins'
                                placeholder='Selectionnez 01 medecin'
                                search
                                selection
                                options={optionsUsers}
                                onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Dropdown
                                label='Polices'
                                minCharacters={0}
                                name='polices'
                                placeholder='Selectionnez ...'
                                search
                                selection
                                options={optionsPolices}
                                onChange={this.onChangeField.bind(this)}/>

                            <Form.Dropdown
                                label='Tarifs'
                                minCharacters={0}
                                name='tarifs'
                                placeholder='Selectionnez ...'
                                search
                                selection
                                options={optionsAssurances}
                                onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>


                        <Form.TextArea label='Observations'
                                       name='observations'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un ticket</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

TicketsAdd.propTypes = {
    patients: PropTypes.array
};

export default createContainer(() => {

    const patientsHandle = Meteor.subscribe('patients');
    const policessHandle = Meteor.subscribe('polices');
    const usrsHandle = Meteor.subscribe('allUsers');
    const loading = !patientsHandle.ready() && !usrsHandle.ready() && !policessHandle.ready();

    return {
        Session,
        loading,
        usrs: Meteor.users.find({roles:"medecin"}).fetch().map((usr)=>{
            return {
                key: usr._id,
                text: usr.emails[0].address,
                value: usr._id
            }
        }),
        patients : Patients.find({visible: true}).fetch().map((patient)=>{
            return {
                key: patient._id,
                text: patient.nomEtPrenom,
                value: patient._id
            }
        }),
        polices : Polices.find({visible: true}).fetch().map((police)=>{
            return {
                key: police._id,
                text: `${police.numeroPolice}-${police.societe}`,
                value: police.tauxCouverture
            }
        })
    };
}, TicketsAdd );