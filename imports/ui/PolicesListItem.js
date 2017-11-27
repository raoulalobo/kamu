import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table , Button, Modal , Form, Message, Icon} from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Societes } from '../api/societes';

export class PolicesListItem extends Component {

    constructor (props) {
        super(props);
        this.state = {
            currentUser : Meteor.user(),
            modalOpen: false,
            error: ''
        }
    }
    onSubmit(e) {
        const { numeroPolice, societe , libelle , tauxCouverture, observations } = this.state;

        e.preventDefault();

        if ( numeroPolice && societe && libelle && tauxCouverture && observations ) {

            Meteor.call('polices.insert', numeroPolice , societe ,libelle , parseInt( tauxCouverture.trim() ) , observations , (err, res) => {
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
    deleteButton () {
        if ( Roles.userIsInRole(this.state.currentUser, ['admin','caisse']) ) {
            return (
                <Button onClick={this.onDelete.bind(this)} color='red' size='mini' icon>
                    <Icon name='trash'/>
                </Button>
            )
        }
    }
    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        if (user) {
            this.setState({currentUser: user._id});
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
            modalOpen: true ,
            numeroPolice: this.props.police.numeroPolice,
            societe: this.props.police.societe,
            libelle: this.props.police.libelle,
            tauxCouverture: this.props.police.tauxCouverture,
            observations: this.props.police.observations,
        } );
    }
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`)
    }
    componentWillUnmount() {
        Meteor.subscribe('societes').stop();
    }
    modifyButton () {

        if ( true ) {

            const optionsSocietes = this.props.societes;

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

                                <Form.Input label='Numero de police'
                                            name='numeroPolice'
                                            value={this.state.numeroPolice}
                                            onChange={this.onChangeField.bind(this)}/>

                                <Form.Dropdown
                                    label='Societe'
                                    minCharacters={0}
                                    name='societe'
                                    placeholder='Selectionnez 01 societe'
                                    search
                                    selection
                                    options={optionsSocietes}
                                    defaultValue={this.state.societe}
                                    onChange={this.onChangeField.bind(this)}/>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input label='Libelle'
                                            name='libelle'
                                            value={this.state.libelle}
                                            onChange={this.onChangeField.bind(this)}/>

                                <Form.Input label='Taux de couverture'
                                            name='tauxCouverture'
                                            value={this.state.tauxCouverture}
                                            onChange={this.onChangeField.bind(this)}/>

                            </Form.Group>


                            <Form.TextArea label='Observations'
                                           name='observations'
                                           value={this.state.observations}
                                           onChange={this.onChangeField.bind(this)}/>

                            <Form.Button fluid basic color='blue'>Ajouter et creer un police</Form.Button>
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
                <Table.Cell>{this.props.police.numeroPolice}</Table.Cell>
                <Table.Cell>{this.props.police.societe}</Table.Cell>
                <Table.Cell>{this.props.police.plafond}</Table.Cell>
                <Table.Cell>{this.props.police.tauxCouverture}</Table.Cell>
                <Table.Cell>{this.props.police.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

PolicesListItem.propTypes = {
    police: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const user = Meteor.user() || null;
    const societesHandle = Meteor.subscribe('societes');
    const loading = !societesHandle.ready() ;

    return {
        Session,
        loading,
        user,
        call: Meteor.call,
        societes : Societes.find({visible: true}).fetch().map((societe)=>{
            return {
                key: societe._id,
                text: societe.societe,
                value: societe.code
            }
        }),
    };
}, PolicesListItem );
