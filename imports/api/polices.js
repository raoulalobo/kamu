import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Polices = new Mongo.Collection('polices');

if ( Meteor.isServer ) {
    Meteor.publish('polices', function() {
        return Polices.find({});
    });

    Meteor.methods({
        'polices.insert'(  numeroPolice , societe , libelle, tauxCouverture, observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    numeroPolice: {
                        type: String,
                        label: 'Numero Police',
                    },
                    societe: {
                        type: String,
                        label: 'Societe'
                    },
                    libelle: {
                        type: String,
                        label: 'Libelle'
                    },
                    tauxCouverture: {
                        type: Number,
                        label: 'Taux de couverture'
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ numeroPolice , societe , libelle, tauxCouverture, observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Polices.insert({

                numeroPolice ,
                societe ,
                libelle,
                tauxCouverture,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Polices : id ${id} et numero de Police : ${numeroPolice}`)}

            });
        },
        'polices.delete'(id) {
            Polices.remove(id);
        }
    })

}
