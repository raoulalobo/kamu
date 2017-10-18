import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'
import { Patients } from '../api/patients';

export class SoinsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            idTicket: '',
            actes:'',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { idTicket, actes, observations } = this.state;

        e.preventDefault();

        if ( idTicket && actes && observations  ) {

            Meteor.call('soins.insert', idTicket , actes , observations , (err, res) => {
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
            idTicket: '',
            actes:'',
            observations: '',
            error: ''
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });

    }
    componentWillReceiveProps(nextProps) {

        const { patients } = nextProps;
        console.log(this.props);
        console.log(nextProps)

    }
    componentWillUnmount() {
        //Meteor.subscribe('patients').stop()
    }
    render() {
        const optionsPatients = this.props.patients;

        return (

            <Modal
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 soin</Button>}>
                <Modal.Header>Ajouter 01 soin</Modal.Header>
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
                                id='nomp'
                                placeholder='Selectionnez 01 patient'
                                search
                                selection
                                options={optionsPatients}
                                onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.TextArea label='Actes'
                                       name='actes'
                                       id='autre'
                                       value={this.state.actes}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un soin</Form.Button>

                        <Form.TextArea label='Observations'
                                       name='observations'
                                       id='autre'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un soin</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

SoinsAdd.propTypes = {
    patients: PropTypes.array
};

export default createContainer(() => {

    const patientsHandle = Meteor.subscribe('patients');
    const loading = !patientsHandle.ready() ;

    return {
        Session,
        loading,

        patients : Patients.find({visible: true}).fetch().map((patient)=>{
            return {
                key: patient._id,
                text: patient.nomEtPrenom,
                value: [patient._id,patient.nomEtPrenom].join("+")
            }
        })
    };
}, SoinsAdd );