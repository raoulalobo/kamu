import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message, Dropdown } from 'semantic-ui-react'

import { Stocks } from '../api/stocks';

export class TransactionsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            produit: '',
            idProduit:'',
            type: '',
            qtte: '',
            observations: '',
            error: ''
        };
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
            produit: '',
            idProduit:'',
            type: '',
            qtte: '',
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
        if ( name === `produit`) {
            console.log( `_Id  --> ${e.currentTarget.id}`);
            console.log( `_Id  --> ${e.currentTarget.title}`);
            this.setState( { 'idProduit' : e.currentTarget.id });
        }
    }
    componentWillReceiveProps(nextProps) {

        console.log(this.props);
        console.log(nextProps)

    }
    componentWillUnmount() {
        Meteor.subscribe('stocks').stop();
    }
    render() {

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
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 transaction</Button>}>
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
                                onChange={this.onChangeField.bind(this)}/>

                            <Form.Dropdown
                                label='Type de transaction'
                                minCharacters={0}
                                name='type'
                                placeholder='Selectionnez 01 type'
                                search
                                selection
                                options={optionsType}
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
        );
    }
}

TransactionsAdd.propTypes = {

};

export default createContainer(() => {

    const stocksHandle = Meteor.subscribe('stocks');
    const loading = !stocksHandle.ready() ;

    return {
        Session,
        loading,
        stocks : Stocks.find({visible: true}).fetch().map((stock)=>{
            return {
                key: stock._id,
                text: stock.libelle,
                value: stock.libelle,
                id: stock._id,
                title: stock._id,
            }
        }),
    };

}, TransactionsAdd );