import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Tarifs = new Mongo.Collection('tarifs');

if ( Meteor.isServer ) {
    Meteor.publish('tarifs', function() {
        return Tarifs.find({});
    });

    Meteor.methods({
        'tarifs.insert'(  libelle , montant , desc , observations  ){
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

            return Tarifs.insert({

                libelle ,
                montant ,
                desc ,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Tarifs : id ${id} et montant : ${numeroTarif}`)}

            });
        },
        'tarifs.delete'(id) {
            Tarifs.remove(id);
        }
    })

}
