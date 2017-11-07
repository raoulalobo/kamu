import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'
import { Tickets } from '../api/tickets';

export class FicheMedicalesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            tickets: '',
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
            antecedents_m: '',
            antecedents_f: '',
            diagnostique: '',
            ordonnance_traitement: '',
            surveillance: '',
            observations: '',
            currentUser : Meteor.user(),
            error: ''
        };
    }
    onSubmit(e) {
        const { tickets, medecins, poids, temperature, pie, fc, ta, glycemie, fre, spo2, motifs_consultation, histoire_maladie, antecedents, diagnostique, ordonnance_traitement, surveillance, observations } = this.state;

        e.preventDefault();

        if ( tickets && medecins && poids && temperature && pie && fc && ta && glycemie && fre && spo2 && motifs_consultation && histoire_maladie && antecedents && diagnostique && ordonnance_traitement && surveillance && observations ) {


            Meteor.call('tickets.insert', tickets, medecins, poids.trim(), temperature.trim(), pie.trim(), fc.trim(), ta.trim(), glycemie.trim(), fre.trim(), spo2.trim(), motifs_consultation.trim(), histoire_maladie.trim(), antecedents.trim(), diagnostique.trim(), ordonnance_traitement.trim(), surveillance.trim() , observations.trim()  , (err, res) => {
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
            tickets: '',
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
            antecedents_m: '',
            antecedents_f: '',
            diagnostique: '',
            ordonnance_traitement: '',
            surveillance: '',
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

        const { user } = nextProps;
        if (user) {
            this.props.Session.set('userId', user._id);
            this.setState({currentUser: user._id});
        }

    }
    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        if (user) {
            this.props.Session.set('userId', user._id);
            this.setState({currentUser: user._id});
        }
    }
    componentWillUnmount() {
        Meteor.subscribe('tickets').stop()
    }
    infirmierEtMedecin(){
        return(

                <Form.TextArea label='Ordonnance / Traitement '
                               name='ordonnance_traitement'
                               readOnly={Roles.userIsInRole(this.state.currentUser, ['infirmier','admin'])}
                               value={this.state.ordonnance_traitement}
                               onChange={this.onChangeField.bind(this)}/>

            )
    }
    medecinForm(){
        if ( Roles.userIsInRole(this.state.currentUser, ['medecin','admin']) ) {
            return(
                <div>
                    <Form.TextArea label='Diagnostique'
                                   name='diagnostique'
                                   value={this.state.diagnostique}
                                   onChange={this.onChangeField.bind(this)}/>

                    <Form.TextArea label='Surveillance'
                                   name='surveillance'
                                   value={this.state.surveillance}
                                   onChange={this.onChangeField.bind(this)}/>

                    <Form.TextArea label='Observations'
                                   name='observations'
                                   value={this.state.observations}
                                   onChange={this.onChangeField.bind(this)}/>
                </div>
            )
        }
    }
    render() {
        const optionsTickets = this.props.tickets;
        const optionsUsers = this.props.usrs;
        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
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
                        <div>
                            <Form.Group widths='equal'>
                                <Form.Dropdown
                                    label='Ticket Id'
                                    minCharacters={0}
                                    name='tickets'
                                    placeholder='Selectionnez 01 ticket'
                                    search
                                    selection
                                    options={optionsTickets}
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


                            <Form.TextArea label='Antecedents Personnels'
                                           name='antecedents_m'
                                           value={this.state.antecedents_m}
                                           onChange={this.onChangeField.bind(this)}/>

                            <Form.TextArea label='Antecedents Familiaux'
                                           name='antecedents_f'
                                           value={this.state.antecedents_f}
                                           onChange={this.onChangeField.bind(this)}/>
                        </div>
                        {this.medecinForm()}
                        {this.infirmierEtMedecin()}


                        <Form.Button fluid basic color='blue'>Ajouter et creer un ficheMedicale</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

FicheMedicalesAdd.propTypes = {
    tickets: PropTypes.array
};

export default createContainer(() => {

    const ticketsHandle = Meteor.subscribe('tickets');
    const usrsHandle = Meteor.subscribe('allUsers');
    const user = Meteor.user() || undefined ;
    const loading = !ticketsHandle.ready() && !usrsHandle.ready();

    return {
        Session,
        loading,
        user,
        usrs: Meteor.users.find({roles:"medecin"}).fetch().map((usr)=>{
            return {
                key: usr._id,
                text: usr.emails[0].address,
                value: usr._id
            }
        }),
        tickets : Tickets.find({visible: true}).fetch().map((ticket)=>{
            return {
                key: ticket._id,
                text: ticket._id.toLowerCase(),
                value: ticket._id
            }
        })
    };
}, FicheMedicalesAdd );
