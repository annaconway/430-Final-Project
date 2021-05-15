const models = require('../models');

const { Routine } = models;

// ---------------
// ROUTINE BUILDER PAGE
// ---------------
const builderPage = (req, res) => {
  // Grab account information to show personal routines
  Routine.RoutineModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occureed' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), routines: docs });
  });
};

// ---------------
// POST ROUTINE REQUEST
// ---------------
const buildRoutine = (req, res) => {
  // Missing parameters?
  if (!req.body.name
      || !req.body.concerns
      || !req.body.cleanser
      || !req.body.moisturizer
      || !req.body.sunscreen) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Format into data object
  const RoutineData = {
    name: req.body.name,
    skin: req.body.skin,
    concerns: req.body.concerns,
    cleanser: req.body.cleanser,
    moisturizer: req.body.moisturizer,
    sunscreen: req.body.sunscreen,
    owner: req.session.account._id,
  };

  // Build routine
  const newRoutine = new Routine.RoutineModel(RoutineData);
  const routinePromise = newRoutine.save();
  routinePromise.then(() => res.json({ redirect: '/builder' }));

  // Catch errors
  routinePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Routine already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return routinePromise;
};

// ---------------
// GET ROUTINE REQUEST
// ---------------
const getRoutines = (request, response) => {
  const req = request;
  const res = response;

  // Grab account information
  return Routine.RoutineModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ routines: docs });
  });
};

// ---------------
// GET DRY ROUTINE
// ---------------
const getDryRoutines = (request, response) => {
  const res = response;

  // Grab account information
  return Routine.RoutineModel.findBySkin('dry', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ routines: docs });
  });
};

// ---------------
// GET OILY ROUTINE
// ---------------
const getOilyRoutines = (request, response) => {
  const res = response;

  // Grab account information
  return Routine.RoutineModel.findBySkin('oily', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ routines: docs });
  });
};

// ---------------
// GET NORMAL ROUTINE
// ---------------
const getNormalRoutines = (request, response) => {
  const res = response;

  // Grab account information
  return Routine.RoutineModel.findBySkin('normal', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ routines: docs });
  });
};

// ---------------
// GET COMBINATION ROUTINE
// ---------------
const getCombinationRoutines = (request, response) => {
  const res = response;

  // Grab account information
  return Routine.RoutineModel.findBySkin('combination', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ routines: docs });
  });
};

// ---------------
// DELETE ROUTINE REQUEST
// ---------------
const deleteRoutine = (request, response) => {
  const req = request;
  const res = response;

  return Routine.RoutineModel.findAndDelete(req.body.routineId, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ message: 'Deleted Routine' });
  });
};

// ---------------
// UPDATE ROUTINE REQUEST
// ---------------
const updateRoutine = (request, response) => {
  const req = request;
  const res = response;

  return Routine.RoutineModel.findAndUpdate(
    req.body._id,
    req.body.name,
    req.body.skin,
    req.body.concerns,
    req.body.cleanser,
    req.body.moisturizer,
    req.body.sunscreen, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured' });
      }
      return res.status(200).json({ message: 'Updated Routine' });
    });
};

module.exports.builderPage = builderPage;
module.exports.getRoutines = getRoutines;
module.exports.getDryRoutines = getDryRoutines;
module.exports.getNormalRoutines = getNormalRoutines;
module.exports.getCombinationRoutines = getCombinationRoutines;
module.exports.getOilyRoutines = getOilyRoutines;
module.exports.deleteRoutine = deleteRoutine;
module.exports.updateRoutine = updateRoutine;
module.exports.buildRoutine = buildRoutine;
