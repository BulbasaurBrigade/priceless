const router = require('express').Router();
// const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const admin = require('firebase-admin');
const {
  models: { User },
} = require('../db');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
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
    // console.log(userRecord);
    // const user = await User.create({ authId: userRecord.uid });
    // res.send({token: await user.generateToken()})
    res.sendStatus(200);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
