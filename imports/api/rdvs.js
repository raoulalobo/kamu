import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Rdvs = new Mongo.Collection('rdvs');

if ( Meteor.isServer ) {
    Meteor.publish('rdvs', function() {
        return Rdvs.find({});
    });

    Meteor.methods({
        'rdvs.insert'(  dateHeureRdv , idTicket , motifRdv,  observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    dateHeureRdv: {
                        type: Date,
                        label: 'Date',
                    },
                    idTicket: {
                        type: String,
                        label: 'ID du Ticket',
                    },
                    motifRdv: {
                        type: String,
                        label: 'Motif du rendez-vous',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ dateHeureRdv, idTicket , motifRdv,  observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Rdvs.insert({

                dateHeureRdv : dateHeureRdv.getTime(),
                idTicket ,
                motifRdv,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Rdvs : id ${idTicket} et nom : ${motifRdv}`)}

            });
        },
        'rdvs.delete'(id) {
            Rdvs.remove(id);
        }
    })

}
