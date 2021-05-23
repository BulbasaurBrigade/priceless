/* eslint-disable global-require */
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const mySocket = require('./socket');
const { db } = require('./db');

const PORT = process.env.PORT || 8080;
const app = require('./app');

const createLottery = require('./lottery');

const init = async () => {
  try {
    await db.sync();

    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );

    const io = socketIo(server);
    mySocket(io);

    createLottery(io);

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp({
        credential: admin.credential.cert(
          process.env.GOOGLE_APPLICATION_CREDENTIALS
        ),
      });
    } else {
      const serviceAccount = require('../serviceAccount.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};

init();
