"use strict";

const {
  db,
  models: { User, Post, PostImage },
} = require("../server/db");
const postData = require("./postData");
const userData = require("./userData");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // await Promise.all(
  //   userData.map(async (user) => {
  //     await User.create({
  //       displayName: user.displayName,
  //       isAdmin: user.isAdmin,
  //       latitude: user.latitude,
  //       longitude: user.longitude,
  //       authId: user.authId,
  //     });
  //   })
  // );
  const user1 = await User.create({
    displayName: "pantsPants",
    isAdmin: true,
    latitude: 40.683716869,
    longitude: -73.9616982471,
    authId: "ykEZ8wGYKKv",
  });

  const user2 = await User.create({
    displayName: "just_Ina",
    isAdmin: true,
    latitude: 40.676795538,
    longitude: -73.9245801458,
    authId: "eFtCtmRQc",
  });

  const user3 = await User.create({
    displayName: "sTyLiNg_IZ_LyFe",
    isAdmin: true,
    latitude: 40.6798439413,
    longitude: -73.9586804019,
    authId: "fIcVm6nLIf6",
  });

  const user4 = await User.create({
    displayName: "mer1359",
    isAdmin: true,
    latitude: 40.6808100739,
    longitude: -73.9272616734,
    authId: "KXY2VbCvcQaR",
  });

  const user5 = await User.create({
    displayName: "msutcliffe4",
    isAdmin: false,
    latitude: 40.6907742668,
    longitude: -73.9001142532,
    authId: "R5k68QUvT",
  });

  const user6 = await User.create({
    displayName: "ssaint5",
    isAdmin: false,
    latitude: 40.6837000737,
    longitude: -73.9379372319,
    authId: "dg4Kgq7mv",
  });

  const user7 = await User.create({
    displayName: "mhizir6",
    isAdmin: false,
    latitude: 40.6693466307,
    longitude: -73.9187988306,
    authId: "P6IRojo",
  });

  const post1 = await Post.create({
    title: "Stack of sci fi books",
    description:
      "pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla",
    latitude: 40.6936829589,
    longitude: -73.9190985031,
    category: "books",
    status: "lottery",
    type: "listing",
  });

  const post2 = await Post.create({
    title: "Patio table",
    description:
      "nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat",
    latitude: 40.694141004,
    longitude: -73.9264390019,
    category: "furniture",
    status: "pending",
    type: "listing",
  });

  const post3 = await Post.create({
    title: "Dog toys",
    description:
      "nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo",
    latitude: 40.6867081921,
    longitude: -73.911496617,
    category: "pet supplies",
    status: "lottery",
    type: "listing",
  });

  const post4 = await Post.create({
    title: "Baby/toddler bathtub",
    description:
      "adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum",
    latitude: 40.6919869647,
    longitude: -73.9101530595,
    category: "children's items",
    status: "lottery",
  });

  const post5 = await Post.create({
    title: "Couch",
    description:
      "lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet",
    latitude: 40.6774189324,
    longitude: -73.9176679719,
    category: "furniture",
    status: "lottery",
    type: "listing",
  });

  const post6 = await Post.create({
    title: "Blender",
    description:
      "ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a",
    latitude: 40.6866482431,
    longitude: -73.8999142622,
    category: "kitchen",
    status: "claimed",
    type: "listing",
  });

  const post7 = await Post.create({
    title: "Hair ties",
    description:
      "pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi",
    latitude: 40.6932944546,
    longitude: -73.9468055556,
    category: "personal care",
    status: "pending",
    type: "listing",
  });

  const post8 = await Post.create({
    title: "Cracking the Coding Interview",
    description:
      "magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris",
    latitude: 40.6906538494,
    longitude: -73.9566925273,
    category: "books",
    status: "open",
    type: "listing",
  });
  // await Promise.all(
  //   postData.map(async (post) => {
  //     await Post.create({
  //       title: post.title,
  //       description: post.description,
  //       latitude: post.latitude,
  //       longitude: post.longitude,
  //       category: post.category,
  //       status: post.status,
  //       type: post.type,
  //     });
  //   })
  // );

  //post1 - STACK OF BOOKS - lottery, 3 requesters, no recipients
  await post1.setPoster(user5);
  await post1.addRequester(user1);
  await post1.addRequester(user2);
  await post1.addRequester(user3);

  //post2 - PATIO TABLE - pending, 3 requesters, 1 recipient
  await post2.setPoster(user5);

  await post2.addRequester(user1);
  await post2.addRequester(user2);
  await post2.addRequester(user3);

  await post2.addRecipient(user2);

  //post3 - DOG TOYS - lottery, 1 requester, no recipients
  await post3.setPoster(user1);

  await post3.addRequester(user5);

  //post4 - BABY BATH - lottery, 2 requesters
  await post4.setPoster(user6);
  await post4.addRequester(user7);
  await post4.addRequester(user6);

  //post5 - COUCH - lottery, 1 requester, no recipients
  await post5.setPoster(user6);
  await post5.addRequester(user7);

  //post6 - BLENDER - claimed, 2 requesters, 2 recipients
  await post6.setPoster(user6);

  await post4.addRequester(user7);
  await post4.addRequester(user6);

  await post4.addRecipient(user6);
  await post4.addRecipient(user7);

  //post7 - HAIR TIES - lottery, no requesters
  await post7.setPoster(user6);

  //post8 - CODING BOOK - open, no requesters
  await post8.setPoster(user2);

  //console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
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
