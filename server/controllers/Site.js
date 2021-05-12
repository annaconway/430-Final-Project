// HOME PAGE
const homePage = (req, res) => {
  res.render('layouts/home', { csrfToken: req.csrfToken() });
};

// INFO PAGE
const infoPage = (req, res) => {
  res.render('layouts/info', { csrfToken: req.csrfToken() });
};

// INFO PAGE
const adminPage = (req, res) => {
  res.render('layouts/admin', { csrfToken: req.csrfToken() });
};

module.exports.homePage = homePage;
module.exports.infoPage = infoPage;
module.exports.adminPage = adminPage;
