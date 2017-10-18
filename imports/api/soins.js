import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Soins = new Mongo.Collection('soins');

if ( Meteor.isServer ) {
    Meteor.publish('soins', function() {
        return Soins.find({});
    });

    Meteor.methods({
        'soins.insert'(  idTicket , acte,  observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    idTicket: {
                        type: String,
                        label: 'idTicket',
                    },
                    acte: {
                        type: String,
                        label: 'idTicket',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ idTicket , acte,  observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Soins.insert({

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
