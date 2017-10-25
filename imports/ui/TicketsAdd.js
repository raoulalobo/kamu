import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message, Checkbox } from 'semantic-ui-react'
import { Patients } from '../api/patients';
import { Polices } from '../api/polices';
import {Tarifs} from "../api/tarifs";

export class TicketsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            patients: '',
            nomp:'',
            medecins: '',
            nomm:'',
            polices: '',
            taux:0,
            tarifs: '',
            prix:0,
            autre:'',
            nonAssureEntreprise:'RAS',
            nonAssureProfession:'RAS',
            codeAssure:'RAS',
            nomAssurePrincipal:'RAS',
            assure: false ,
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { patients, nomp, medecins, nomm , polices , taux, tarifs, prix, nonAssureEntreprise , nonAssureProfession , codeAssure , nomAssurePrincipal , observations } = this.state;

        e.preventDefault();

        if ( patients && medecins && polices && tarifs && observations ) {

            const montant = prix - ( prix *(taux/100) ) ;

            //console.log( `${patients} , ${nomp} , ${medecins} , ${nomm}  , ${polices} , ${tarifs} , ${montant} ` )
            console.log( typeof montant,montant );
            Meteor.call('tickets.insert', patients , nomp , medecins, nomm ,polices , tarifs ,parseInt(montant) , nonAssureEntreprise , nonAssureProfession , codeAssure , nomAssurePrincipal , observations , (err, res) => {
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
            nomp:'',
            medecins: '',
            nomm:'',
            polices: '',
            taux:0,
            tarifs: '',
            prix:0,
            autre:'',
            nonAssureEntreprise:'RAS',
            nonAssureProfession:'RAS',
            codeAssure:'RAS',
            nomAssurePrincipal:'RAS',
            assure: false ,
            observations: '',
            error: ''
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    onChangeField(e, { name,id,value }) {

        this.setState( { [name] : value.split("+",2)[0] });
        this.setState( { [id] : parseInt( value.split("+",2)[1] ) || value.split("+",2)[1]  });
        console.log(`${name} -> ${value}`)


        //console.log(`${name} -> ${value.split("+",2)[0]} et ${id} -> ${value.split("+",2)[1]}`);
        //console.log(`${this.state.taux} -> ${this.state.prix}`);

    }
    onChangeCheckBox(e) {
        this.setState( { assure : !this.state.assure } );
        this.setState({
            nonAssureEntreprise:'RAS',
            nonAssureProfession:'RAS',
            codeAssure:'RAS',
            nomAssurePrincipal:'RAS',
        });
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
    assureForm(){
        if ( this.state.assure  ) {
            return(

                <Form.Group widths='equal'>
                    <Form.Input label='Code Assure'
                                name='codeAssure'
                                id='autre'
                                value={this.state.codeAssure}
                                onChange={this.onChangeField.bind(this)}/>
                    <Form.Input label='Nom assure Principal'
                                name='nomAssurePrincipal'
                                id='autre'
                                value={this.state.nomAssurePrincipal}
                                onChange={this.onChangeField.bind(this)}/>
                </Form.Group>
            )
        } else {
            return(

                <Form.Group widths='equal'>
                    <Form.Input label='Entreprise (Non assures)'
                                name='nonAssureEntreprise'
                                id='autre'
                                value={this.state.nonAssureEntreprise}
                                onChange={this.onChangeField.bind(this)}
                                />
                    <Form.Input label='Profession (Non assures)'
                                name='nonAssureProfession'
                                id='autre'
                                value={this.state.nonAssureProfession}
                                onChange={this.onChangeField.bind(this)}/>
                </Form.Group>
            )
        }
    }
    render() {
        const optionsPatients = this.props.patients;
        const optionsUsers = this.props.usrs;
        const optionsPolices = this.props.polices;
        const optionsTarifs = this.props.tarifs;
        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
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
                        <Form.Checkbox
                            onChange={this.onChangeCheckBox.bind(this)}
                            label='Cochez la case si le patient est assure' />
                        <Form.Group widths='equal'>
                            <Form.Dropdown
                                        label='Patients'
                                        minCharacters={0}
                                        name='patients'
                                        id='nomp'
                                        placeholder='Selectionnez 01 patient'
                                        search
                                        selection
                                        options={optionsPatients}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Dropdown
                                label='Medecins'
                                minCharacters={0}
                                name='medecins'
                                id='nomm'
                                placeholder='Selectionnez 01 medecin'
                                search
                                selection
                                options={optionsUsers}
                                onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        {this.assureForm()}

                        <Form.Group widths='equal'>
                            <Form.Dropdown
                                label='Polices'
                                minCharacters={0}
                                name='polices'
                                id='taux'
                                placeholder='Selectionnez ...'
                                search
                                selection
                                options={optionsPolices}
                                onChange={this.onChangeField.bind(this)}/>

                            <Form.Dropdown
                                label='Tarifs'
                                minCharacters={0}
                                name='tarifs'
                                id='prix'
                                placeholder='Selectionnez ...'
                                search
                                selection
                                options={optionsTarifs}
                                onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>


                        <Form.TextArea label='Observations'
                                       name='observations'
                                       id='autre'
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
    const tarifsHandle = Meteor.subscribe('tarifs');
    const loading = !patientsHandle.ready() && !usrsHandle.ready() && !policessHandle.ready() && !tarifsHandle.ready();

    return {
        Session,
        loading,
        usrs: Meteor.users.find({roles:"medecin"}).fetch().map((usr)=>{
            return {
                key: usr._id,
                text: `${usr.emails[0].address}-${usr.profile.specialites}`,
                value: [usr._id,`${usr.emails[0].address}-${usr.profile.specialites}`].join("+")
            }
        }),
        patients : Patients.find({visible: true}).fetch().map((patient)=>{
            return {
                key: patient._id,
                text: patient.nomEtPrenom,
                value: [patient._id,patient.nomEtPrenom].join("+")
            }
        }),
        polices : Polices.find({visible: true}).fetch().map((police)=>{
            return {
                key: police._id,
                text: `${police.numeroPolice}-${police.societe}`,
                value: [`${police.numeroPolice}-${police.societe}`,police.tauxCouverture].join("+")
            }
        }),
        tarifs : Tarifs.find({visible: true}).fetch().map((tarifs)=>{
            return {
                key: tarifs._id,
                text: tarifs.libelle,
                value: [tarifs.libelle,tarifs.montant].join("+")
            }
        })
    };
}, TicketsAdd );