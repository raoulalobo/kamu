import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export class TypePrestationsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            code: '',
            libelle: '',
            descriptions: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { code , libelle , descriptions } = this.state;

        e.preventDefault();

        if ( code && libelle &&  descriptions ) {

            Meteor.call('typeprestations.insert', code ,  libelle , descriptions , (err, res) => {
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
            code: '',
            libelle: '',
            descriptions: '',
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

    componentWillReceiveProps(nextProps) {


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
                dimmer='blurring'
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 type de paiement </Button>}>
                <Modal.Header>Ajouter 01 type de paiement </Modal.Header>
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

                            <Form.Input label='Code prestation'
                                        name='code'
                                        value={this.state.code}
                                        onChange={this.onChangeField.bind(this)}/>

                            <Form.Input label='Libelle prestation'
                                        name='libelle'
                                        value={this.state.libelle}
                                        onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        <Form.TextArea label='Observations'
                                       name='descriptions'
                                       value={this.state.descriptions}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Ajouter et creer 01 type de paiement </Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

TypePrestationsAdd.propTypes = {

};

export default createContainer(() => {

    return {
        Session
    };

}, TypePrestationsAdd );