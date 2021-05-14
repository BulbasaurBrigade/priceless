const router = require('express').Router();
const {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} = require('firebase/auth');
const admin = require('firebase-admin');
const {
  models: { User },
} = require('../db');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const token = await admin.auth().createCustomToken(req.body.uid);
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    await User.create({ authId: userRecord.uid });
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.send({ token });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/signup/moreinfo', async (req, res, next) => {
  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(req.headers.authorization);
    const [numRows, users] = await User.update(
      {
        displayName: req.body.displayName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      {
        where: {
          authId: decodedToken.uid,
        },
        returning: true,
      }
    );
    res.send(users[0]);
  } catch (ex) {
    next(ex);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(req.headers.authorization);
    const user = await User.findOne({
      where: {
        authId: decodedToken.uid,
      },
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
