import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Tickets = new Mongo.Collection('tickets');

if ( Meteor.isServer ) {
    Meteor.publish('tickets', function() {
        return Tickets.find({});
    });

    Meteor.methods({
        'tickets.insert'(  idPatient , idMedecin , assure, idSociete, observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    idPatient: {
                        type: String,
                        label: 'idPatient',
                    },
                    idMedecin: {
                        type: String,
                        label: 'idMedecin'
                    },
                    assure: {
                        type: String,
                        label: 'assure'
                    },
                    idSociete: {
                        type: String,
                        label: 'idSociete'
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ idPatient , idMedecin , assure, idSociete, observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Tickets.insert({

                idPatient ,
                idMedecin ,
                assure,
                idSociete,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Tickets : id ${id} et nom : ${nomEtPrenom}`)}

            });
        },
        'tickets.delete'(id) {
            Tickets.remove(id);
        }
    })

}
