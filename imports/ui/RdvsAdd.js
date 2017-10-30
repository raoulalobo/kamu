import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react';
import Flatpickr from 'react-flatpickr';
import {fr} from 'flatpickr/dist/l10n/fr.js';
import { Tickets } from '../api/tickets';

export class RdvsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            dateRdv: '',
            tickets: '',
            motifs:'',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { dateRdv, tickets, motifs, observations } = this.state;

        e.preventDefault();

        if ( dateRdv && tickets && motifs && observations  ) {

            Meteor.call('rdvs.insert', dateRdv , tickets.toLowerCase() , motifs , observations , (err, res) => {
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
            dateRdv:'',
            tickets: '',
            motifs:'',
            observations: '',
            error: ''
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`);

    }
    componentWillReceiveProps(nextProps) {

        const { tickets } = nextProps;
        console.log(this.props);
        console.log(nextProps)

    }
    componentWillUnmount() {
        Meteor.subscribe('tickets').stop()
    }
    render() {
        const optionsTickets = this.props.tickets;

        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 rdv</Button>}>
                <Modal.Header>Ajouter 01 rdv</Modal.Header>
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
                                <label>Date Rdv</label>
                                <div className='ui input'>
                                    <Flatpickr
                                        as={Form.Field}
                                        data-enable-time
                                        onChange={ (startDate)  => {
                                            this.setState( { dateRdv : startDate[0] } ) ;
                                            console.log(this.state.dateRdv) ;
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
                                id='nomp'
                                placeholder='Selectionnez 01 ticket'
                                search
                                selection
                                options={optionsTickets}
                                onChange={this.onChangeField.bind(this)}/>


                        </Form.Group>

                        <Form.TextArea label='Motif'
                                       name='motifs'
                                       id='autre'
                                       value={this.state.motifs}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.TextArea label='Observations'
                                       name='observations'
                                       id='autre'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer un rdv</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

RdvsAdd.propTypes = {
    tickets: PropTypes.array
};

export default createContainer(() => {

    const ticketsHandle = Meteor.subscribe('tickets');
    const loading = !ticketsHandle.ready() ;

    return {
        Session,
        loading,

        tickets : Tickets.find({visible: true}).fetch().map((ticket)=>{
            return {
                key: ticket._id,
                text: ticket._id,
                value: ticket._id
            }
        })
    };
}, RdvsAdd );