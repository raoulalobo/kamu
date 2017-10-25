import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Societes = new Mongo.Collection('societes');

if ( Meteor.isServer ) {
    Meteor.publish('societes', function() {
        return Societes.find({});
    });

    Meteor.methods({
        'societes.insert'(   societe, code , observations ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({


                    societe: {
                        type: String,
                        label: 'societe',
                    },
                    code: {
                        type: String,
                        label: 'code',
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({  societe, code ,  observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Societes.insert({

                societe,
                code ,
                observations,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Societes : id ${societe} et nom : ${observations}`)}

            });
        },
        'societes.delete'(id) {
            Societes.remove(id);
        }
    })

}
