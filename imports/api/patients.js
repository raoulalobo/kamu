import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Patients = new Mongo.Collection('patients');

if ( Meteor.isServer ) {
    Meteor.publish('patients', function(dateStart, dateEnd ) {
        return Patients.find({ dateTime: { $gte: dateStart , $lte: dateEnd } });
    });

    Meteor.methods({
        'patients.insert'( _id  , dateNaissance , nomEtPrenom , tel, observations  ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({
                    _id: {
                        type: String,
                        label: 'Identifiant Unique',
                    },
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
                    observations: {
                        type: String,
                        label: 'Observations'
                    }
                }).validate({ _id , dateNaissance  , nomEtPrenom , tel , observations });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            Patients.insert({
                _id,
                dateNaissance ,
                nomEtPrenom ,
                tel,
                observations,
                userId: this.userId,
                insertedAt : new Date().getTime(),
                visible: true,
            } , (err)=>{ if (!err)  { console.log(`Patients : nom ${nomEtPrenom} et profession ${profession}`)} });
        },
        'patients.delete'(id) {
            Patients.remove(id);
        },
        'patients.modify'(_id, dateTime , imm , dest , driver , fdr , amount , seats , leasing ,km , obs ) {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            new SimpleSchema({
                _id: {
                    type: String,
                    label: '_id',
                },
                dateTime: {
                    type: Date,
                    label: 'Date',
                },
                imm: {
                    type: String,
                    label: 'Immatriculation',
                    min : 3,
                    max : 5
                },
                dest: {
                    type: String,
                    label: 'Destination',
                    allowedValues: ['yaounde','douala'],
                },
                driver: {
                    type: String,
                    label: 'Chauffeur'
                },
                fdr: {
                    type: SimpleSchema.Integer,
                    label: 'FDR',
                },
                amount: {
                    type: SimpleSchema.Integer,
                    label: 'Prix place',
                },
                seats: {
                    type: SimpleSchema.Integer,
                    label: 'Nbr de places',
                },
                leasing: {
                    type: SimpleSchema.Integer,
                    label: 'Location',
                },
                km: {
                    type: SimpleSchema.Integer,
                    label: 'Kmtrage',
                },
                obs: {
                    type: String,
                    label: 'Observations',
                    min : 3,
                    max : 70,
                }
            }).validate({ _id , dateTime , imm , dest , driver , fdr , amount , seats , leasing ,km , obs});

            Patients.update({
                _id
            }, {
                $set: {
                    dateTime : dateTime.getTime(),
                    imm ,
                    dest,
                    driver ,
                    fdr ,
                    amount ,
                    seats ,
                    leasing ,
                    km ,
                    obs,
                    updatedAt : new Date().getTime(),
                    updatedUserId : this.userId
                }
            },(err)=>{ if (!err) { console.log(`Driver : ${driver} et Vehicule ${imm}`) } });
        }
    })

}
