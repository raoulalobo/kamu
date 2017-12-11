import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Typeprestations = new Mongo.Collection('typeprestations');

if ( Meteor.isServer ) {
    Meteor.publish('typeprestations', function() {
        return Typeprestations.find({});
    });

    Meteor.methods({
        'typeprestations.insert'(   code, libelle , descriptions ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({


                    code: {
                        type: String,
                        label: 'typeprestation',
                    },
                    libelle: {
                        type: String,
                        label: 'libelle',
                    },
                    descriptions: {
                        type: String,
                        label: 'Descriptions'
                    }
                }).validate({  code , libelle ,  descriptions });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Typeprestations.insert({

                code,
                libelle ,
                descriptions,
                creeLe: this.userId,
                creePar : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Typeprestations : id ${typeprestation} et nom : ${descriptions}`)}

            });
        },
        'typeprestations.delete'(id) {
            Typeprestations.remove(id);
        }
    })

}
