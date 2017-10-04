import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Flatpickr from 'react-flatpickr';
import {fr} from 'flatpickr/dist/l10n/fr.js';
import { Router, Route, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message, Dropdown } from 'semantic-ui-react'
import { Patients } from '../api/patients';

export class TicketsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            nomEtPrenom: '' ,
            dateNaissance: '' ,
            tel:'',
            genre:'',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { dateNaissance, nomEtPrenom , tel, observations, genre } = this.state;

        e.preventDefault();

        if ( dateNaissance && nomEtPrenom && tel && observations && genre  ) {

            const identifiant = new Date().getTime()+nomEtPrenom.trim().toLowerCase().replace(/[ ]/g, "_").replace(/[']/g, "+");
            console.log( identifiant ) ;
            Meteor.call('patients.insert', dateNaissance , nomEtPrenom.trim().toLowerCase() ,tel.trim().toLowerCase() , genre, observations.trim().toLowerCase()  , (err, res) => {
                if (!err) {
                    this.handleClose();
                    Bert.alert( `enregistrement ${res} ajoute avec succes.`, 'danger', 'growl-top-right', 'fa-check'  )
                    browserHistory.replace('/tickets');
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
            nomEtPrenom: '' ,
            dateNaissance: '' ,
            tel:'',
            genre:'',
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
    }
    render() {
        const options = this.props.patients
        return (

            <Modal
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter un patient</Button>}>
                <Modal.Header>Ajouter un patient</Modal.Header>
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
                                        placeholder='Select Friend'
                                        search
                                        selection
                                        options={options} />
                            <Form.Input label='Telephone'
                                        name='tel'
                                        value={this.state.tel}
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


    const patientsTicketHandle = Meteor.subscribe('patients');
    const loading = !patientsTicketHandle.ready();

    return {
        Session,
        loading,
        patients : Patients.find({visible: true}).fetch().map((patient)=>{
            return {
                key: patient._id,
                text: patient.nomEtPrenom,
                value: patient.nomEtPrenom
            }
        })
    };
}, TicketsAdd );