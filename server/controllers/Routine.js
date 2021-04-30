const models = require('../models');

const { Routine } = models;

// ROUTINE BUILDER PAGE
const builderPage = (req, res) => {
  // Grab account information
  Routine.RoutineModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occureed' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), routines: docs });
  });
};

// ROUTINE BUILDER METHOD
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
    // type: req.body.skin,
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

// GET ROUTINE REQUEST
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

module.exports.builderPage = builderPage;
module.exports.getRoutines = getRoutines;
module.exports.buildRoutine = buildRoutine;
