import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Lits = new Mongo.Collection('lits');

if ( Meteor.isServer ) {
    Meteor.publish('lits', function() {
        return Lits.find({});
    });

    Meteor.methods({
        'lits.insert'(  libelle , observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    libelle: {
                        type: String,
                        label: 'Libelle lits',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ libelle , observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Lits.insert({

                libelle ,
                observations,
                occupe: false,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Lits : id ${id} et nom : ${libelle}`)}

            });
        },
        'lits.delete'(id) {
            Lits.remove(id);
        }
    })

}
