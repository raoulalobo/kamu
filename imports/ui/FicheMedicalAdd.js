import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Flatpickr from 'react-flatpickr';
import {fr} from 'flatpickr/dist/l10n/fr.js';
import { Router, Route, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message, Dropdown } from 'semantic-ui-react'
import { Patients } from '../api/patients';

export class FicheMedicalesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            patients: '',
            medecins: '',
            poids: '',
            temperature: '',
            pie: '',
            fc: '',
            ta: '',
            glycemie: '',
            fre: '',
            spo2: '',
            motifs_consultation: '',
            histoire_maladie: '',
            antecedents: '',
            diagnostique: '',
            ordonnance_traitement: '',
            surveillance: '',
            rendez_vous: '',
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
                    browserHistory.replace('/ficheMedicales');
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
            poids: '',
            temperature: '',
            pie: '',
            fc: '',
            ta: '',
            glycemie: '',
            fre: '',
            spo2: '',
            motifs_consultation: '',
            histoire_maladie: '',
            antecedents: '',
            diagnostique: '',
            ordonnance_traitement: '',
            surveillance: '',
            rendez_vous: '',
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
        const optionsPatients = this.props.patients;
        const optionsUsers = this.props.usrs;
        return (

            <Modal
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='large'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter un ficheMedicale</Button>}>
                <Modal.Header>Ajouter un ficheMedicale</Modal.Header>
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
                            <Form.Input label='Assurance'
                                        name='assurance'
                                        value={this.state.tel}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Societe'
                                        name='societe'
                                        value={this.state.tel}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Dropdown
                                label='Medecins'
                                minCharacters={0}
                                name='medecins'
                                placeholder='Selectionnez 01 medecin'
                                search
                                selection
                                options={optionsUsers}
                                onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Telephone'
                                        name='tel'
                                        value={this.state.tel}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Input label='Poids'
                                        name='poids'
                                        value={this.state.poids}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Temp.'
                                        name='temperature'
                                        value={this.state.temperature}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Pi'
                                        name='pie'
                                        value={this.state.pie}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='FC'
                                        name='fc'
                                        value={this.state.fc}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Input label='T.A'
                                        name='ta'
                                        value={this.state.ta}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Glycemie'
                                        name='glycemie'
                                        value={this.state.glycemie}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='FR'
                                        name='fre'
                                        value={this.state.fre}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='SPo2'
                                        name='spo2'
                                        value={this.state.spo2}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.TextArea label='Motifs de consultations'
                                       name='motifs_consulation'
                                       value={this.state.motifs_consulation}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.TextArea label='Histoire de la maladie'
                                       name='histoire_maladie'
                                       value={this.state.histoire_maladie}
                                       onChange={this.onChangeField.bind(this)}/>


                        <Form.TextArea label='Antecedents'
                                       name='antecedents'
                                       value={this.state.antecedents}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.TextArea label='Diagnostique'
                                       name='diagnostique'
                                       value={this.state.diagnostique}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.TextArea label='Ordonnance / Traitement '
                                       name='ordonnance_traitement'
                                       value={this.state.ordonnance_traitement}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.TextArea label='Surveillance'
                                       name='surveillance'
                                       value={this.state.surveillance}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.TextArea label='Rendez-vous'
                                       name='rendez_vous'
                                       value={this.state.rendez_vous}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.TextArea label='Observations'
                                       name='observations'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un ficheMedicale</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

FicheMedicalesAdd.propTypes = {
    patients: PropTypes.array
};

export default createContainer(() => {

    const patientsHandle = Meteor.subscribe('patients');
    const usrsHandle = Meteor.subscribe('allUsers');
    const loading = !patientsHandle.ready() && !usrsHandle.ready();

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
                value: patient.nomEtPrenom
            }
        })
    };
}, FicheMedicalesAdd );