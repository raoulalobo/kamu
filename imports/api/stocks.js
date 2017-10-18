import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Stocks = new Mongo.Collection('stocks');

if ( Meteor.isServer ) {
    Meteor.publish('stocks', function() {
        return Stocks.find({});
    });

    Meteor.methods({
        'stocks.insert'(  libelle , qtte,  observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    libelle: {
                        type: String,
                        label: 'Libelle stocks',
                    },
                    qtte: {
                        type: Number,
                        label: 'Quantite',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ libelle , qtte,  observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Stocks.insert({

                libelle ,
                qtte,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Stocks : id ${id} et nom : ${libelle}`)}

            });
        },
        'stocks.delete'(id) {
            Stocks.remove(id);
        }
    })

}
