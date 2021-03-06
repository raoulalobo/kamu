import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Stocks = new Mongo.Collection('stocks');

if ( Meteor.isServer ) {
    Meteor.publish('stocks', function() {
        return Stocks.find({});
    });

    Meteor.methods({
        'stocks.insert'(  libelle , qtte, qtteMin, qtteMax, telResponsables,  observations  ){
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
                    qtteMin: {
                        type: Number,
                        label: 'Quantite min.',
                    },
                    qtteMax: {
                        type: Number,
                        label: 'Quantite max.',
                    },
                    telResponsables: {
                        type: String,
                        label: 'Telephones responsables',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ libelle , qtte, qtteMin, qtteMax, telResponsables, observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Stocks.insert({

                libelle ,
                qtte,
                qtteMin,
                qtteMax,
                telResponsables,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Stocks : id ${id} et nom : ${libelle}`)}

            });
        },
        'stocks.sorties'(_id, val) {
            Stocks.update({
                _id
            }, {
                $inc: { qtte : -val } ,
                $set: {
                    updatedAt : new Date().getTime(),
                    qttAdd : -val,
                    updatedBy : this.userId
                }
            },(err)=>{ if (!err) { console.log(`MAJ : id ${_id} reussie `)} } );
        },
        'stocks.entrees'(_id, val) {
            Stocks.update({
                _id
            }, {
                $inc: { qtte : val } ,
                $set: {
                    updatedAt : new Date().getTime(),
                    qttAdd : val,
                    updatedBy : this.userId
                }
            },(err)=>{ if (!err) { console.log(`MAJ : id ${_id} reussie `)} } );
        },
        'stocks.delete'(id) {
            Stocks.remove(id);
        }
    })

}
