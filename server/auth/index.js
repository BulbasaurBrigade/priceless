const router = require('express').Router();
const admin = require('firebase-admin');
const {
  models: { User },
} = require('../db');
const { requireToken } = require('../middleware/gatekeeping');

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

router.post('/signup/moreinfo', requireToken, async (req, res, next) => {
  try {
    const [numRows, users] = await User.update(
      {
        displayName: req.body.displayName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      {
        where: {
          authId: req.user.authId,
        },
        returning: true,
      }
    );
    res.send(users[0]);
  } catch (ex) {
    next(ex);
  }
});

router.get('/me', requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});
