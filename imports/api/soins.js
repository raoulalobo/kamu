import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Soins = new Mongo.Collection('soins');

if ( Meteor.isServer ) {
    Meteor.publish('soins', function() {
        return Soins.find({});
    });

    Meteor.methods({
        'soins.insert'(  dateHeureSoin , idTicket , acte,  observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    dateHeureSoin: {
                        type: Date,
                        label: 'Date',
                    },
                    idTicket: {
                        type: String,
                        label: 'ID du ticket',
                    },
                    acte: {
                        type: String,
                        label: 'Acte',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ dateHeureSoin, idTicket , acte,  observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Soins.insert({

                dateHeureSoin : dateHeureSoin.getTime(),
                idTicket ,
                acte,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Soins : id ${idTicket} et nom : ${acte}`)}

            });
        },
        'soins.delete'(id) {
            Soins.remove(id);
        }
    })

}
