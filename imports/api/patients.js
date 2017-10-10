import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Patients = new Mongo.Collection('patients');

if ( Meteor.isServer ) {
    Meteor.publish('patients', function() {
        return Patients.find({});
    });

    Meteor.methods({
        'patients.insert'(  dateNaissance , nomEtPrenom , tel, genre, observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    dateNaissance: {
                        type: Date,
                        label: 'Date de Naissance',
                    },
                    nomEtPrenom: {
                        type: String,
                        label: 'Nom et Prenom'
                    },
                    tel: {
                        type: String,
                        label: 'Telephone'
                    },
                    genre: {
                        type: String,
                        label: 'Genre'
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ dateNaissance  , nomEtPrenom , tel , genre, observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Patients.insert({

                dateNaissance ,
                nomEtPrenom ,
                tel,
                genre,
                observations,
                userId: this.userId,
                insertedAt : new Date().getTime(),
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Patients : id ${id} et profession ${observations}`)}

            });
        },
        'patients.delete'(id) {
            Patients.remove(id);
        }
    })

}
