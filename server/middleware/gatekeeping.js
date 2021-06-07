const admin = require('firebase-admin');
const {
  models: { User },
} = require('../db');

// Protects routes that only logged in users should be able to access
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({
      where: {
        authId: decodedToken.uid,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

// Protects routes that only an admin should be able to access
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send('Nice try!');
  }
  next();
};

module.exports = {
  requireToken,
  isAdmin,
};
