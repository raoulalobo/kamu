import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Transactions = new Mongo.Collection('transactions');

if ( Meteor.isServer ) {
    Meteor.publish('transactions', function() {
        return Transactions.find({});
    });

    Meteor.methods({
        'transactions.insert'(  produit , type , qtte ,  observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    produit: {
                        type: String,
                        label: 'Produit',
                    },
                    type: {
                        type: String,
                        label: 'Type de transaction',
                    },
                    qtte: {
                        type: Number,
                        label: 'Quantite',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ produit, type , qtte,  observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Transactions.insert({

                produit ,
                type ,
                qtte,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Transactions : id ${id} et nom : ${produit}`)}

            });
        },
        'transactions.delete'(id) {
            Transactions.remove(id);
        }
    })

}
