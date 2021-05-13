'use strict';

const {
  db,
  models: { User, Post, PostImage, Chat, Message },
} = require('../server/db');
const postData = require('./postData');
const userData = require('./userData');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

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
    displayName: 'pantsPants',
    isAdmin: true,
    latitude: 40.683716869,
    longitude: -73.9616982471,
    authId: 'ykEZ8wGYKKv',
  });

  const user2 = await User.create({
    displayName: 'just_Ina',
    isAdmin: true,
    latitude: 40.676795538,
    longitude: -73.9245801458,
    authId: 'eFtCtmRQc',
  });

  const user3 = await User.create({
    displayName: 'sTyLiNg_IZ_LyFe',
    isAdmin: true,
    latitude: 40.6798439413,
    longitude: -73.9586804019,
    authId: 'fIcVm6nLIf6',
  });

  const user4 = await User.create({
    displayName: 'mer1359',
    isAdmin: true,
    latitude: 40.6808100739,
    longitude: -73.9272616734,
    authId: 'KXY2VbCvcQaR',
  });

  const user5 = await User.create({
    displayName: 'msutcliffe4',
    isAdmin: false,
    latitude: 40.6907742668,
    longitude: -73.9001142532,
    authId: 'R5k68QUvT',
  });

  const user6 = await User.create({
    displayName: 'ssaint5',
    isAdmin: false,
    latitude: 40.6837000737,
    longitude: -73.9379372319,
    authId: 'dg4Kgq7mv',
  });

  const user7 = await User.create({
    displayName: 'mhizir6',
    isAdmin: false,
    latitude: 40.6693466307,
    longitude: -73.9187988306,
    authId: 'P6IRojo',
  });

  const books = await Post.create({
    title: 'Stack of sci fi books',
    description:
      'pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla',
    latitude: 40.6936829589,
    longitude: -73.9190985031,
    category: 'books',
    status: 'lottery',
    type: 'listing',
  });

  const patioTable = await Post.create({
    title: 'Patio table',
    description:
      'nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat',
    latitude: 40.694141004,
    longitude: -73.9264390019,
    category: 'furniture',
    status: 'pending',
    type: 'listing',
  });

  const dogToys = await Post.create({
    title: 'Dog toys',
    description:
      'nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo',
    latitude: 40.6867081921,
    longitude: -73.911496617,
    category: 'pet supplies',
    status: 'lottery',
    type: 'listing',
  });

  const babyTub = await Post.create({
    title: 'Baby/toddler bathtub',
    description:
      'adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum',
    latitude: 40.6919869647,
    longitude: -73.9101530595,
    category: "children's items",
    status: 'lottery',
  });

  const couch = await Post.create({
    title: 'Couch',
    description:
      'lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet',
    latitude: 40.6774189324,
    longitude: -73.9176679719,
    category: 'furniture',
    status: 'lottery',
    type: 'listing',
  });

  const blender = await Post.create({
    title: 'Blender',
    description:
      'ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
    latitude: 40.6866482431,
    longitude: -73.8999142622,
    category: 'kitchen',
    status: 'claimed',
    type: 'listing',
  });

  const hairTies = await Post.create({
    title: 'Hair ties',
    description:
      'pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi',
    latitude: 40.6932944546,
    longitude: -73.9468055556,
    category: 'personal care',
    status: 'pending',
    type: 'listing',
  });

  const codingBook = await Post.create({
    title: 'Cracking the Coding Interview',
    description:
      'magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris',
    latitude: 40.6906538494,
    longitude: -73.9566925273,
    category: 'books',
    status: 'open',
    type: 'listing',
  });

  const booksImage = await PostImage.create({
    imageUrl:
      'https://www.literaryladiesguide.com/wp-content/uploads/2020/09/New-Octavia-E.-Butler-editions.jpg',
  });

  const patioTableImage = await PostImage.create({
    imageUrl:
      'https://2.bp.blogspot.com/-f8JdvpVxDds/Vz_BHFyH6VI/AAAAAAAApvY/QQVlTAMk4uUlR7qxdgndr2Nbh3sldhN5QCKgB/s1600/20160520_102236.jpg',
  });
  const hairTiesImage = await PostImage.create({
    imageUrl:
      'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/p720x720/178807949_10157600681931207_7065250951746932672_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=843cd7&_nc_ohc=nUCXH_8PZCkAX88KrBz&_nc_ht=scontent-lga3-1.xx&tp=6&oh=65fd6becefb45458b2b2471f3f0b7459&oe=60C09DBD',
  });

  const couchImage = await PostImage.create({
    imageUrl:
      'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/p720x720/164480130_1150934455352978_7268583081046715916_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=3b2858&_nc_ohc=xoTwhDPDCfgAX_xGVvs&_nc_ht=scontent-lga3-1.xx&tp=6&oh=ad82e13cb8e41f4fb73702da8027ecd4&oe=60C2BE62',
  });

  const dogToysImage = await PostImage.create({
    imageUrl:
      'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/p720x720/175329968_5424435317627055_4293942314768149761_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=843cd7&_nc_ohc=c2koSeYEQ2wAX-gWLFS&_nc_ht=scontent-lga3-1.xx&tp=6&oh=1db99f3c8eafa83f28cb6ea9f99eae0a&oe=60C14855',
  });

  const babyTubImage = await PostImage.create({
    imageUrl:
      'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/p720x720/124592960_142588950935211_1912037765715765934_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=3b2858&_nc_ohc=HuvC16BpDuEAX_NPBCF&_nc_ht=scontent-lga3-1.xx&tp=6&oh=3d9e08712184e40a5b66d14c1dc0ffab&oe=60C1733B',
  });

  const blenderImage = await PostImage.create({
    imageUrl:
      'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/p720x720/167572671_10225627410772096_3190404038067621647_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=3b2858&_nc_ohc=m6t-hizkuUcAX9tIcfS&_nc_ht=scontent-lga3-1.xx&tp=6&oh=c7534f2185be4055581b7b8dde76c956&oe=60C0A175',
  });

  const codingBookImage = await PostImage.create({
    imageUrl:
      'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/p720x720/162812081_10223517859668390_7170721734966878886_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=3b2858&_nc_ohc=sBfqJH5ujRUAX9y4-46&_nc_oc=AQkufizbEP5D5t2938lKBqk4vWM8R8p7cNVD1R2XbdZu8oLFxTHVdXWQRF66kl_Hj58&_nc_ht=scontent-lga3-1.xx&tp=6&oh=c0bc7ff08c444d3adb6b49b6d0ed18d9&oe=60C03FEC',
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

  // books - STACK OF BOOKS - lottery, 3 requesters, no recipients
  await books.setPoster(user5);

  await books.addRequester(user1);
  await books.addRequester(user2);
  await books.addRequester(user3);

  await books.addPostImages(booksImage);

  // patioTable - PATIO TABLE - pending, 3 requesters, 1 recipient
  await patioTable.setPoster(user5);

  await patioTable.addRequester(user1);
  await patioTable.addRequester(user2);
  await patioTable.addRequester(user3);

  await patioTable.setRecipient(user2);
  const patioChat = await Chat.create();
  await patioChat.setPost(patioTable);
  await patioChat.setPoster(patioTable.posterId);
  await patioChat.setRecipient(patioTable.recipientId);

  await patioTable.addPostImages(patioTableImage);

  const msg1 = await Message.create({
    content: "Hi, you're the lucky winner! Want to meet up?",
  });
  const msg2 = await Message.create({
    content: 'Yes, please!',
  });

  await msg1.setChat(patioChat);
  await msg2.setChat(patioChat);
  await msg1.setUser(user5);
  await msg2.setUser(user2);

  // dogToys - DOG TOYS - lottery, 1 requester, no recipients
  await dogToys.setPoster(user1);

  await dogToys.addRequester(user5);

  await dogToys.addPostImages(dogToysImage);

  // babyTub - BABY BATH - lottery, 2 requesters
  await babyTub.setPoster(user6);
  await babyTub.addRequester(user7);
  await babyTub.addRequester(user6);

  await babyTub.addPostImages(babyTubImage);

  // couch - COUCH - lottery, 1 requester, no recipients
  await couch.setPoster(user6);
  await couch.addRequester(user7);

  await couch.addPostImages(couchImage);

  // blender - BLENDER - claimed, 2 requesters, 2 recipients
  await blender.setPoster(user5);

  await blender.addRequester(user7);
  await blender.addRequester(user6);

  await blender.setRecipient(user6);
  const blenderChat = await Chat.create();
  await blenderChat.setPost(blender);
  await blenderChat.setPoster(blender.posterId);
  await blenderChat.setRecipient(blender.recipientId);

  await blender.setRecipient(user7);
  const blenderChatTwo = await Chat.create();
  await blenderChatTwo.setPost(blender);
  await blenderChatTwo.setPoster(blender.posterId);
  await blenderChatTwo.setRecipient(blender.recipientId);

  await blender.addPostImages(blenderImage);

  // hairTies - HAIR TIES - lottery, no requesters
  await hairTies.setPoster(user6);

  await hairTies.addPostImages(hairTiesImage);

  // codingBook - CODING BOOK - open, no requesters
  await codingBook.setPoster(user2);

  await codingBook.addPostImages(codingBookImage);

  // console.log(`seeded ${users.length} users`);
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
  console.log('seeding...');
  try {
    await seed();
    // await db.sync({ force: true });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
