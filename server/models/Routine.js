const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let RoutineModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

// ROUTINE DATA
const RoutineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  concerns: {
    type: String,
    required: true,
    trim: true,
  },

  cleanser: {
    type: String,
    required: true,
    trim: true,
  },

  moisturizer: {
    type: String,
    required: true,
    trim: true,
  },

  sunscreen: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// ROUTINE DATA
RoutineSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  concerns: doc.concerns,
  cleanser: doc.cleanser,
  moisturizer: doc.moisturizer,
  sunscreen: doc.sunscreen,
});

// FIND ROUTINE BY ACCOUNT
RoutineSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return RoutineModel.find(search).select('name concerns cleanser moisturizer sunscreen').lean().exec(callback);
};

RoutineModel = mongoose.model('Routine', RoutineSchema);

module.exports.RoutineModel = RoutineModel;
module.exports.RoutineSchema = RoutineSchema;
