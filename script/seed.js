"use strict";

const {
  db,
  models: { User, Post },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ displayName: "cody" }),
    User.create({ displayName: "murphy" }),
    User.create({ displayName: "meredith" }),
  ]);

  const posts = await Promise.all([
    Post.create({ title: "Hair Ties", latitude: 40.333, longitude: 70.455 }),
    Post.create({ title: "Couch", latitude: 40.333, longitude: 70.455 }),
  ]);

  //console.log(users[0].__proto__)
  // view user magic methods 


  await posts[0].setPoster(users[0]);
  await posts[0].addRequester(users[1]);
  await posts[1].addRecipient(users[0]);

  //await posts[1].setUsers([users[2]]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
