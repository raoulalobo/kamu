import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table , Button, Modal , Form, Message, Icon } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Stocks } from '../api/stocks';

export class TransactionsListItem extends Component {

    constructor (props) {
        super(props);
        this.state = {
            currentUser : Meteor.user(),
            modalOpen: false,
            produit: '',
            idProduit:'',
            type: '',
            qtte: '',
            observations: '',
            error: ''
        }
    }
    onSubmit(e) {
        const { produit, idProduit ,type , qtte , observations } = this.state;

        e.preventDefault();

        if ( produit && type && qtte && observations ) {


            Meteor.call('transactions.insert', produit ,type , parseInt( qtte.trim() ) , observations , (err, res) => {
                if (!err) {
                    Meteor.call(type, idProduit , parseInt( qtte.trim() )  , (err, res) => {
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
            error: ''
        });
    }

    handleOpen() {
        this.setState( {
            modalOpen: true ,
            produit: this.props.transaction.produit,
            type: this.props.transaction.type,
            qtte: this.props.transaction.qtte,
            observations: this.props.transaction.observations,
        } );
    }

    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`);
        if ( name === `produit`) {
            console.log( `_Id  --> ${e.currentTarget.id}`);
            this.setState( { 'idProduit' : e.currentTarget.id });
        }
    }
    componentWillReceiveProps(nextProps) {

        console.log(this.props);
        console.log(nextProps);

        const { user } = nextProps;
        if (user) {
            this.setState({currentUser: user._id});
        }
    }
    componentWillUnmount() {
        Meteor.subscribe('stocks').stop();
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
        if ( this.props.transaction._id ) {

            const suppression = confirm(`Voulez vous supprimer la transaction: ${this.props.transaction._id}`);
            if (suppression) {
                Meteor.call('transactions.delete', this.props.transaction._id , (err, res) => {
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

            const optionsStocks = this.props.stocks;
            const optionsType = [{ key: 'sorties905788', value: 'stocks.sorties',  text: 'sorties' },
                { key: 'entrees276488', value: 'stocks.entrees',  text: 'entrees' }  ];

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
                    <Modal.Header>Ajouter 01 transaction</Modal.Header>
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
                                    label='Produit'
                                    minCharacters={0}
                                    name='produit'
                                    placeholder='Selectionnez 01 produit'
                                    search
                                    selection
                                    options={optionsStocks}
                                    defaultValue={this.state.produit}
                                    onChange={this.onChangeField.bind(this)}/>

                                <Form.Dropdown
                                    label='Type de transaction'
                                    minCharacters={0}
                                    name='type'
                                    placeholder='Selectionnez 01 type'
                                    search
                                    selection
                                    options={optionsType}
                                    defaultValue={this.state.type}
                                    onChange={this.onChangeField.bind(this)}/>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input label='Quantite'
                                            name='qtte'
                                            value={this.state.qtte}
                                            onChange={this.onChangeField.bind(this)}/>

                            </Form.Group>


                            <Form.TextArea label='Observations'
                                           name='observations'
                                           value={this.state.observations}
                                           onChange={this.onChangeField.bind(this)}/>

                            <Form.Button fluid basic color='blue'>Ajouter et creer un transaction</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            )
        }
    }
    render () {
        return (
            <Table.Row error={this.props.transaction.type === 'stocks.sorties'} positive={this.props.transaction.type === 'stocks.entrees'}>
                <Table.Cell>{this.modifyButton()} {this.deleteButton()}</Table.Cell>
                <Table.Cell>{this.props.transaction.produit}</Table.Cell>
                <Table.Cell>{this.props.transaction.type}</Table.Cell>
                <Table.Cell>{this.props.transaction.qtte}</Table.Cell>
                <Table.Cell>{this.props.transaction.observations}</Table.Cell>
            </Table.Row>
        );
    }


};

TransactionsListItem.propTypes = {
    transaction: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {

    const stocksHandle = Meteor.subscribe('stocks');
    const loading = !stocksHandle.ready() ;

    const user = Meteor.user() || null;
    return {
        Session,
        user,
        call: Meteor.call,
        loading ,
        stocks : Stocks.find({visible: true}).fetch().map((stock)=>{
            return {
                key: stock._id,
                text: stock.libelle,
                value: stock.libelle,
                id: stock._id
            }
        }),
    };
}, TransactionsListItem );
