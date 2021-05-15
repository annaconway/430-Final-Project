const models = require('../models');

const { Account } = models;

// ---------------
// LOGIN PAGE
// ---------------
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// ---------------
// LOGOUT REQUEST
// ---------------
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// ---------------
// LOGIN REQUEST
// ---------------
const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  // Missing username/password?
  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Authentification failed?
  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/builder' });
  });
};

// ---------------
// CHANGEPASSWORD REQUEST
// ---------------
const changePassword = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.generateHash(req.body.pass2, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    Account.AccountModel.changePassword(
      accountData.username,
      accountData.password,
      accountData.salt, (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occured' });
        }

        return res.status(200).json({ message: 'Changed Password' });
      },
    );
  });
};

// ---------------
// SIGNUP REQUEST
// ---------------
const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  // Missing username/password?
  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Passwords don't match?
  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Create account
  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/builder' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

// ---------------
// GET SECURITY TOKEN
// ---------------
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };
  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.changePassword = changePassword;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
