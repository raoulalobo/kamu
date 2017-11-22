import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export class StocksAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            libelle: '',
            qtte:'',
            qtteMin:'',
            qtteMax:'',
            telResponsables:'',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { libelle, qtte, qtteMin, qtteMax, telResponsables,  observations } = this.state;

        e.preventDefault();

        if ( libelle && qtte && observations  ) {

            Meteor.call('stocks.insert', libelle ,parseInt( qtte.trim() ) ,parseInt( qtteMin.trim() ) ,parseInt( qtteMax.trim() ), telResponsables  , observations , (err, res) => {
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
            libelle: '',
            qtte:'',
            qtteMin:'',
            qtteMax:'',
            telResponsables:'',
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

        console.log(this.props);
        console.log(nextProps)

    }
    componentWillUnmount() {

    }
    render() {

        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 stock</Button>}>
                <Modal.Header>Ajouter 01 stock</Modal.Header>
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

                        <Form.Group widths='equal'>
                            <Form.Input label='Quantite min'
                                        name='qtteMin'
                                        value={this.state.qtteMin}
                                        onChange={this.onChangeField.bind(this)}/>
                            <Form.Input label='Quantite max'
                                        name='qtteMax'
                                        value={this.state.qtteMax}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input label='Telephones responsables ( separes par une virgule )'
                                        name='telResponsables'
                                        value={this.state.telResponsables}
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
        );
    }
}

StocksAdd.propTypes = {

};

export default createContainer(() => {

    return {

    };
}, StocksAdd );