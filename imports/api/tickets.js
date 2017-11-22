import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Tickets = new Mongo.Collection('tickets');

if ( Meteor.isServer ) {
    Meteor.publish('tickets', function() {
        return Tickets.find({});
    });

    Meteor.methods({
        'tickets.insert'(  idPatient , nomPatient, idMedecin , nomMedecin, polices, tarifs, montant , nonAssureEntreprise , nonAssureProfession , codeAssure , nomAssurePrincipal , aPayer, prestations, observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    idPatient: {
                        type: String,
                        label: 'idPatient',
                    },
                    nomPatient: {
                        type: String,
                        label: 'idPatient',
                    },
                    idMedecin: {
                        type: String,
                        label: 'idMedecin'
                    },
                    nomMedecin: {
                        type: String,
                        label: 'idMedecin'
                    },
                    polices: {
                        type: String,
                        label: 'assure'
                    },
                    tarifs: {
                        type: String,
                        label: 'idSociete'
                    },
                    montant: {
                        type: Number,
                        label: 'Montant'
                    },
                    nonAssureEntreprise : {
                        type: String,
                        label: 'Entreprise ( Non assure )'
                    },
                    nonAssureProfession : {
                        type: String,
                        label: 'Profession ( Non assure)'
                    },
                    codeAssure : {
                        type: String,
                        label: 'Code assure'
                    },
                    nomAssurePrincipal : {
                        type: String,
                        label: 'Nom assure principal'
                    },
                    aPayer : {
                        type: String,
                        label: 'A payer'
                    },
                    prestations : {
                        type: String,
                        label: 'Prestations'
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ idPatient , nomPatient, idMedecin , nomMedecin , polices, tarifs, montant , nonAssureEntreprise , nonAssureProfession , codeAssure , nomAssurePrincipal , aPayer, prestations, observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Tickets.insert({

                idPatient ,
                nomPatient,
                idMedecin ,
                nomMedecin,
                polices,
                tarifs,
                montant,
                nonAssureEntreprise ,
                nonAssureProfession ,
                codeAssure ,
                nomAssurePrincipal ,
                aPayer,
                prestations,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Tickets : id ${idPatient} et nom : ${montant}`)}

            });
        },
        'tickets.delete'(id) {
            Tickets.remove(id);
        }
    })

}
