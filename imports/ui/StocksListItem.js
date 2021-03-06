import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table , Button, Modal , Form, Message, Icon } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class StocksListItem extends Component {

    constructor (props) {
        super(props);
        this.state = {
            currentUser : Meteor.user(),
            modalOpen: false,
            error: ''
        }
    }
    onSubmit(e) {
        const { libelle, qtte, observations } = this.state;

        e.preventDefault();

        if ( libelle && qtte && observations  ) {

            Meteor.call('stocks.insert', libelle ,parseInt( qtte.trim() )  , observations , (err, res) => {
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
            libelle: this.props.stock.libelle,
            qtte:this.props.stock.qtte,
            observations: this.props.stock.observations,
        } );
    }
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });

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
        if ( Roles.userIsInRole(this.state.currentUser, ['admin','medecin']) ) {
            return (
                <Button onClick={this.onDelete.bind(this)} color='red' size='mini' icon>
                    <Icon name='trash'/>
                </Button>
            )
        }
    }
    onDelete(e){

        e.preventDefault();
        if ( this.props.police._id ) {

            const suppression = confirm(`Voulez vous supprimer la police: ${this.props.police.libelle}`);
            if (suppression) {
                Meteor.call('polices.delete', this.props.police._id , (err, res) => {
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
                    <Modal.Header>Ajouter 01 police</Modal.Header>
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
                                <Form.Input label='Quantite'
                                            name='qtte'
                                            value={this.state.qtte}
                                            onChange={this.onChangeField.bind(this)}/>
                            </Form.Group>


                            <Form.TextArea label='Observations'
                                           name='observations'
                                           id='autre'
                                           value={this.state.observations}
                                           onChange={this.onChangeField.bind(this)}/>
                            <Form.Button fluid basic color='blue'>Creer un stock</Form.Button>
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
                <Table.Cell>{this.props.stock.libelle}</Table.Cell>
                <Table.Cell>{this.props.stock.qtte}</Table.Cell>
                <Table.Cell>{this.props.stock.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

StocksListItem.propTypes = {
    stock: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
    };
}, StocksListItem );
