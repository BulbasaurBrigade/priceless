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
    // syncs to our database
    await db.sync();

    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );

    // initializes a websocket connection and then adds the connection event listener
    const io = socketIo(server);
    mySocket(io);

    // Creates the lottery and sends in our socket connected server
    // To allow a running lottery to emit events to the client
    createLottery(io);

    // If we are in production with this environment variable use it
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp({
        credential: admin.credential.cert(
          process.env.GOOGLE_APPLICATION_CREDENTIALS
        ),
      });
    } else {
      // if not, we must be in dev mode and all the devs have a serviceAccount file locally
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
