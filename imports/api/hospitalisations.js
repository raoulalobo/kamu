import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Hostos = new Mongo.Collection('hostos');

if ( Meteor.isServer ) {
    Meteor.publish('hostos', function() {
        return Hostos.find({});
    });

    Meteor.methods({
        'hostos.insert'(  dateHeureHosto , idTicket , motif, lit ,  observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    dateHeureHosto: {
                        type: Date,
                        label: 'Date',
                    },
                    idTicket: {
                        type: String,
                        label: 'ID du ticket',
                    },
                    motif: {
                        type: String,
                        label: 'Motif',
                    },
                    lit: {
                        type: String,
                        label: 'Lit',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ dateHeureHosto, idTicket , motif, lit ,  observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Hostos.insert({

                dateHeureHosto : dateHeureHosto.getTime(),
                idTicket ,
                motif,
                lit ,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Hostos : id ${idTicket} et nom : ${motif}`)}

            });
        },
        'hostos.delete'(id) {
            Hostos.remove(id);
        }
    })

}
