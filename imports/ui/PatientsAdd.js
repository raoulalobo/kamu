import React from 'react';
import { Meteor } from 'meteor/meteor';
import Flatpickr from 'react-flatpickr';
import {fr} from 'flatpickr/dist/l10n/fr.js';
import { Router, Route, browserHistory } from 'react-router';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export default class PatientsAdd extends React.Component {
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

    render() {
        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
        ]
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
                            <Form.Input label='Nom et Prenom'
                                        name='nomEtPrenom'
                                        value={this.state.nomEtPrenom}
                                        onChange={this.onChangeField.bind(this)}/>
                            <div className='field'>
                                <label>Date Naissance</label>
                                <div className='ui input'>
                                    <Flatpickr
                                        as={Form.Field}
                                        data-enable-time
                                        onChange={ (startDate)  => {
                                            this.setState( { dateNaissance : startDate[0] } ) ;
                                            console.log(this.state.dateNaissance) ;
                                        } }
                                        options={
                                            {
                                                altInput: true,
                                                time_24hr: true,
                                                locale : fr
                                            }
                                        }
                                    />
                                </div>
                            </div>


                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Select label='Genre'
                                         name='genre'
                                         options={options}
                                         placeholder='Genre'
                                         onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Telephone'
                                        name='tel'
                                        value={this.state.tel}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Select label='Contact 1'
                                         name='genre'
                                         options={options}
                                         placeholder='Genre'
                                         onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Telephone Contact 1'
                                        name='tel'
                                        value={this.state.tel}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Select label='Contact 2'
                                         name='genre'
                                         options={options}
                                         placeholder='Genre'
                                         onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Telephone Contact 2'
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
