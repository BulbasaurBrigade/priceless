const admin = require('firebase-admin');
const { db } = require('./db');

const PORT = process.env.PORT || 8080;
const serviceAccount = require('../serviceAccount.json');
// const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const app = require('./app');

const init = async () => {
  try {
    await db.sync();

    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      admin.initializeApp({
        credential: admin.credential.cert(
          process.env.GOOGLE_APPLICATION_CREDENTIALS
        ),
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};

init();
