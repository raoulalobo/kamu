import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react';
import Flatpickr from 'react-flatpickr';
import {fr} from 'flatpickr/dist/l10n/fr.js';
import { Tickets } from '../api/tickets';
import { Lits } from '../api/lits';

export class HostosAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            dateHosto: '',
            tickets: '',
            motif:'',
            lit:'',
            nomLit: '',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { dateHosto, tickets, motif, lit , nomLit , observations } = this.state;

        e.preventDefault();

        if ( dateHosto && tickets && motif && lit && observations  ) {

            Meteor.call('lits.reserved', lit , (err, res) => {
                if (!err) {
                    Meteor.call('hostos.insert', dateHosto , tickets.toLowerCase() , motif, nomLit , observations , (err, res) => {
                        if (!err) {
                            this.handleClose();
                            Bert.alert( `enregistrement ${res} ajoute avec succes.`, 'danger', 'growl-top-right', 'fa-check'  )
                        } else {
                            this.setState({ error: err.reason });
                        }
                    });
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
            dateHosto:'',
            tickets: '',
            motif:'',
            lit:'',
            nomLit: '',
            observations: '',
            error: ''
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    onChangeField(e, { id,text,name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`);
        if ( name === `lit`) {
            //this.setState( { nomLit : text });
            console.log( `Bjr -> ${e.currentTarget.text} , ${value} , ${e.currentTarget.id}`);
            this.setState( { 'nomLit' : e.currentTarget.id });
        }

    }
    componentWillReceiveProps(nextProps) {

        const { tickets } = nextProps;
        console.log(this.props);
        console.log(nextProps)

    }
    componentWillUnmount() {
        //Meteor.subscribe('tickets').stop()
    }
    render() {
        const optionsTickets = this.props.tickets;
        const optionsLits = this.props.lits;

        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 hosto</Button>}>
                <Modal.Header>Ajouter 01 hosto</Modal.Header>
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

                            <div className='field'>
                                <label>Date Hosto</label>
                                <div className='ui input'>
                                    <Flatpickr
                                        as={Form.Field}
                                        data-enable-time
                                        onChange={ (startDate)  => {
                                            this.setState( { dateHosto : startDate[0] } ) ;
                                            console.log(this.state.dateHosto) ;
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

                            <Form.Dropdown
                                label='Tickets'
                                minCharacters={0}
                                name='tickets'
                                id='nomT'
                                placeholder='Selectionnez 01 ticket'
                                search
                                selection
                                options={optionsTickets}
                                onChange={this.onChangeField.bind(this)}/>


                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Input label='Motif'
                                        name='motif'
                                        value={this.state.motif}
                                        onChange={this.onChangeField.bind(this)}/>

                            <Form.Dropdown
                                label='Lits'
                                minCharacters={0}
                                name='lit'
                                placeholder='Selectionnez 01 lit'
                                search
                                selection
                                options={optionsLits}
                                onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        <Form.TextArea label='Observations'
                                       name='observations'
                                       id='autre'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un hosto</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

HostosAdd.propTypes = {
    tickets: PropTypes.array
};

export default createContainer(() => {

    const ticketsHandle = Meteor.subscribe('tickets');
    const litsHandle = Meteor.subscribe('lits');
    const loading = !ticketsHandle.ready() && !litsHandle.ready() ;

    return {
        Session,
        loading,

        tickets : Tickets.find({visible: true}).fetch().map((ticket)=>{
            return {
                key: ticket._id,
                text: ticket._id,
                value: ticket._id
            }
        }),
        lits : Lits.find({occupe: false}).fetch().map((lit)=>{
            return {
                key: lit._id,
                text: lit.libelle,
                value: lit._id,
                id : lit.libelle
            }
        })
    };
}, HostosAdd );