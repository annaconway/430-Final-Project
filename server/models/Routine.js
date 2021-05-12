const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let RoutineModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

// ---------------
// ROUTINE DATA
// ---------------
const RoutineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  skin: {
    type: String,
    required: true,
    trim: true,
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

// ---------------
// ROUTINE DATA
// ---------------
RoutineSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  skin: doc.skin.value,
  concerns: doc.concerns,
  cleanser: doc.cleanser,
  moisturizer: doc.moisturizer,
  sunscreen: doc.sunscreen,
});

// ---------------
// FIND ROUTINE BY ACCOUNT
// ---------------
RoutineSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return RoutineModel.find(search).select('name skin concerns cleanser moisturizer sunscreen').lean().exec(callback);
};

// ---------------
// FIND ROUTINE BY SKIN
// ---------------
RoutineSchema.statics.findBySkin = (type, callback) => {
  const search = {
    skin: type,
  };
  return RoutineModel.find(search).select('name skin concerns cleanser moisturizer sunscreen').lean().exec(callback);
};

// ---------------
// FIND ROUTINE AND DELETE FROM SERVER
// ---------------
RoutineSchema.statics.findAndDelete = (indexId, callback) => {
  const search = {
    _id: convertId(indexId),
  };

  RoutineModel.deleteOne(search).lean().exec(callback);
};

// ---------------
// FIND ROUTINE AND DELETE FROM SERVER
// ---------------
RoutineSchema.statics.findAndUpdate = (
  indexId,
  indexName,
  indexSkin,
  indexConcerns,
  indexCleanser,
  indexMoisturizer,
  indexSunscreen, callback,
) => {
  RoutineModel.updateOne(
    { _id: convertId(indexId) },
    {
      $set: {
        name: indexName,
        skin: indexSkin,
        concerns: indexConcerns,
        cleanser: indexCleanser,
        moisturizer: indexMoisturizer,
        sunscreen: indexSunscreen,
      },
    },
  ).lean().exec(callback);
};

RoutineModel = mongoose.model('Routine', RoutineSchema);

module.exports.RoutineModel = RoutineModel;
module.exports.RoutineSchema = RoutineSchema;
