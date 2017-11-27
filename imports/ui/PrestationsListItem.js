import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table , Button, Modal , Form, Message, Icon } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class PrestationsListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser : Meteor.user(),
            modalOpen: false,
            error: ''
        };
    }
    onSubmit(e) {
        const { libelle, montant , desc, observations } = this.state;

        e.preventDefault();

        if ( libelle && montant && desc && observations ) {

            Meteor.call('prestations.insert', libelle.trim().toUpperCase() , parseInt( montant.trim() ) , desc , observations , (err, res) => {
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
            error: ''
        });
    }

    handleOpen() {
        this.setState( {
            modalOpen: true,
            libelle: this.props.prestation.libelle,
            montant: this.props.prestation.montant,
            desc: this.props.prestation.desc,
            observations: this.props.prestation.observations,
        } );
    }

    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`)
    }
    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        if (user) {
            this.setState({currentUser: user._id});
        }
    }
    componentWillUnmount() {

    }
    deleteButton () {
        if ( true ) {
            return (
                <Button onClick={this.onDelete.bind(this)} color='red' size='mini' icon>
                    <Icon name='trash'/>
                </Button>
            )
        }
    }
    onDelete(e){

        e.preventDefault();
        if ( this.props.prestation._id ) {

            const suppression = confirm(`Voulez vous supprimer la prestation: ${this.props.prestation.libelle}`);
            if (suppression) {
                Meteor.call('prestations.delete', this.props.prestation._id , (err, res) => {
                    if (!err) {
                        Bert.alert( 'element supprime avec succes.', 'danger', 'growl-top-right', 'fa-check'  )
                    } else {
                        Bert.alert( `erreur : ${err}`, 'danger', 'growl-top-right', 'fa-close'  )
                    }
                })
            }

        } else {
            Bert.alert( 'erreur inatendue reessayez.', 'danger', 'growl-top-right', 'fa-close'  )
        }
    }
    modifyButton () {

        if ( true ) {


            return (
                <Modal
                    closeIcon
                    closeOnRootNodeClick={false}
                    onSubmit={this.onSubmit.bind(this)}
                    open={this.state.modalOpen}
                    onClose={this.handleClose.bind(this)}
                    dimmer='blurring'
                    size='small'
                    trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini' icon><Icon name='write' /></Button>}>
                    <Modal.Header>Ajouter 01 prestation</Modal.Header>
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
                                <Form.Input label='Libelle'
                                            name='libelle'
                                            value={this.state.libelle}
                                            onChange={this.onChangeField.bind(this)}/>
                                <Form.Input label='Montant'
                                            name='montant'
                                            value={this.state.montant}
                                            onChange={this.onChangeField.bind(this)}/>

                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='Description'
                                            name='desc'
                                            value={this.state.desc}
                                            onChange={this.onChangeField.bind(this)}/>
                            </Form.Group>


                            <Form.TextArea label='Observations'
                                           name='observations'
                                           value={this.state.observations}
                                           onChange={this.onChangeField.bind(this)}/>
                            <Form.Button fluid basic color='blue'>Ajouter et creer un prestation</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            )
        }
    }
    render () {
        return (
            <Table.Row>
                <Table.Cell>{this.modifyButton()} {this.deleteButton()}</Table.Cell>
                <Table.Cell>{this.props.prestation.libelle}</Table.Cell>
                <Table.Cell>{this.props.prestation.montant}</Table.Cell>
                <Table.Cell>{this.props.prestation.desc}</Table.Cell>
                <Table.Cell>{this.props.prestation.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

PrestationsListItem.propTypes = {
    prestation: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, PrestationsListItem );
