import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Patients = new Mongo.Collection('patients');

if ( Meteor.isServer ) {
    Meteor.publish('patients', function() {
        return Patients.find({});
    });

    Meteor.methods({
        'patients.insert'(  dateNaissance , nomEtPrenom , tel, genre,c_1, t_1, c_2 , t_2 , observations  ){
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
                    c_1 : {
                        type: String,
                        label: 'Contact 1'
                    },
                    t_1 : {
                        type: String,
                        label: 'Telephone Contact 1'
                    },
                    c_2 : {
                        type: String,
                        label: 'Contact 2'
                    },
                    t_2 : {
                        type: String,
                        label: 'Telephone Contact 2'
                    },
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ dateNaissance  , nomEtPrenom , tel , genre, c_1, t_1 , c_2 , t_2 , observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Patients.insert({

                dateNaissance ,
                nomEtPrenom ,
                tel,
                genre,
                c_1,
                t_1,
                c_2,
                t_2,
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
