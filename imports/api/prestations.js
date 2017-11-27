import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Prestations = new Mongo.Collection('prestations');

if ( Meteor.isServer ) {
    Meteor.publish('prestations', function() {
        return Prestations.find({});
    });

    Meteor.methods({
        'prestations.insert'(  libelle , montant , desc , observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    libelle: {
                        type: String,
                        label: 'Libelle'
                    },
                    montant: {
                        type: Number,
                        label: 'Montant'
                    },
                    desc: {
                        type: String,
                        label: 'Description'
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ libelle , montant , desc , observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Prestations.insert({

                libelle ,
                montant ,
                desc ,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Prestations : id ${id} et montant : ${numeroPrestation}`)}

            });
        },
        'prestations.delete'(id) {
            Prestations.remove(id);
        }
    })

}
