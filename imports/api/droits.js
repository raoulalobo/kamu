import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Droits = new Mongo.Collection('droits');

if ( Meteor.isServer ) {
    Meteor.publish('droits', function() {
        return Droits.find({});
    });

    Meteor.methods({
        'droits.insert'( intitule , desc, obs ){
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            try {
                new SimpleSchema({

                    intitule: {
                        type: String,
                        label: 'Intitule'
                    },
                    desc: {
                        type: String,
                        label: 'Description'
                    },
                    obs: {
                        type: String,
                        label: 'Observations',
                        min : 3,
                        max : 70,
                    }
                }).validate({ intitule , desc, obs });
            } catch (e) {
                throw new Meteor.Error(400, e.message);
            }

            return Droits.insert({
                intitule ,
                desc,
                obs,
                creeLe : new Date().getTime(),
                creePar : this.userId,
                visible: true,
            } , (err,id)=>{ if (!err)
            { console.log(`Droits : id ${intitule} cree le  ${new Date().getTime()}`)}

            });
        },
        'droits.delete'(id) {
            Droits.remove(id);
        },
        'droits.modify'( _id, obs ) {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            new SimpleSchema({
                _id: {
                    type: String,
                    label: '_id',
                },
                obs: {
                    type: String,
                    label: 'Observations',
                    min : 3,
                    max : 70,
                }
            }).validate({ _id , obs});

            Droits.update({
                _id
            }, {
                $set: {
                    obs,
                    modifieLe : new Date().getTime(),
                    modifiePar : this.userId
                }
            },(err)=>{ if (!err) { console.log(`doit : ${_id} modifie le ${modifieLe}`) } });
        }
    })

}
