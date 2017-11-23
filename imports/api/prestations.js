import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Prestations = new Mongo.Collection('prestations');

if ( Meteor.isServer ) {
    Meteor.publish('prestations', function() {
        return Prestations.find({});
    });

    Meteor.methods({
        'prestations.insert'(  libelle , observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    libelle: {
                        type: String,
                        label: 'Libelle prestations',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ libelle , observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Prestations.insert({

                libelle ,
                observations,
                occupe: false,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Prestations : id ${id} et nom : ${libelle}`)}

            });
        },
        'prestations.reserved'(_id ) {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            new SimpleSchema({
                _id: {
                    type: String,
                    min: 1
                }
            }).validate({ _id});

            Prestations.update({
                _id
            }, {
                $set: {
                    occupe : true
                }
            },(err)=>{ if (!err) { console.log('good modified ')}} );
        },
        'prestations.delete'(id) {
            Prestations.remove(id);
        }
    })

}
