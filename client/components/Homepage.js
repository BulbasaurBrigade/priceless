import React from 'react';
import LandingPage from './LandingPage';
import Footer from './Footer';

const Homepage = (props) => {
  return (
    <div id="home-container">
      <LandingPage />

      <div id="app-description">
        <h1>About Priceless</h1>
        <p>
          Priceless is a collaborative website focused on neighborhoods and
          local communities where you can post items to give away or browse
          listings in your area. Inspired by Buy Nothing Facebook groups, we aim
          to promote mutual aid and sustainability by offering hyper-local gift
          economies a dedicated platform. Sign up to create a post or just
          browse around -- you might find something you’re looking for right
          next door!
        </p>
      </div>
      <div id="how-to-container">
        <h1>How to Use Priceless</h1>
        <div className="how-to-left">
          <h3>Sign Up</h3>
          <p>
            Make an account and include your location, so Priceless can show you
            what’s available in your neighborhood.
          </p>
        </div>
        <div className="how-to-right">
          <h3>Create Posts</h3>
          <p>
            Create posts to offer resources to your neighbors. We encourage you
            to share plenty of information and pictures in your initial post.
          </p>
        </div>
        <div className="how-to-left">
          <h3>Browse Listings and Request Items</h3>
          <p>
            In the first 24 hours after an item is posted, Priceless will accept
            requests for that item. When 24 hours is up, an interested user will
            be randomly selected and connected to the poster to work out the
            details of the exchange.
          </p>

          <p>
            If a post is listed as “pending”, there is a pending transaction
            taking place. If it doesn’t work out, another drawing will take
            place or the post will be listed as “open.”
          </p>

          <p>
            If a post is listed as “open”, that item has been listed for more
            than 24 hours, and there is no one waiting to be connected to the
            poster. The next person who requests the item will be directly
            connected to the poster for an exchange.
          </p>
        </div>
        <div className="how-to-right">
          <h3>Chat</h3>
          <p>
            Chat with folks you have connected with on posts to arrange the pick
            up / drop off details. If you can’t find a time to connect, or the
            item isn’t quite what you need, pass on the item and the lottery
            will run again.
          </p>
          <br />
          <p>Posters mark the post as claimed when the exchange is complete.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
