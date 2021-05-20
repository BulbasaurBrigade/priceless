import React from "react";

const FAQ = () => {
  return (
    <div id="faq-container">
      <h2>Frequently Asked Questions</h2>
      <details>
        <summary>Why the lottery system?</summary>
        <div id="faq-content">
          <p>
            We designed the lottery system in an attempt to create a fair way
            for all users to have a chance to request the items they want or
            need, rather than simply using a first come, first served system
            which gives the advantage to users who are able to check the website
            often and request an item they’re interested in very soon after it
            is posted.
          </p>
        </div>
      </details>
      <details>
        <summary>How does the lottery work?</summary>
        <div id="faq-content">
          <p>
            The lottery allows users to request items for 24 hours after the
            first request comes in. Once that time is up, it randomly selects a
            winner from the pool of users who expressed interest. If the
            selected user passes on the item, the lottery system will select
            another user. If no one expresses interest after 24 hours, the
            listing goes into open mode, where any user who expresses interest
            can immediately claim the item.
          </p>
        </div>
      </details>
      <details>
        <summary>
          What happens when I request an item with a status of pending?
        </summary>
        <div id="faq-content">
          <p>FILL IN ANSWER</p>
        </div>
      </details>
      <details>
        <summary>Can I post a price for my listing?</summary>
        <div id="faq-content">
          <p>
            In the spirit of mutual aid and community connectedness, we ask that
            you only list items you are comfortable giving to a neighbor for
            free.
          </p>
        </div>
      </details>
      <details>
        <summary>
          Why do you ask for my location when I try to make an account?
        </summary>
        <div id="faq-content">
          <p>
            The location tied to your user account is only used to center the
            map when you view posts! We want to make sure that even though our
            website serves all of New York City, your experience is focused on
            your local community.
          </p>
        </div>
      </details>
      <details>
        <summary>
          What about when I post an item? Should I include my home address?
        </summary>
        <div id="faq-content">
          <p>
            You do not need to post your home address, and since the location is
            on the public post you probably shouldn’t! We ask for a location for
            your post to help place it on the map and show it to the people
            around you. You can give cross streets, public places, zip codes, or
            neighborhoods.
          </p>
        </div>
      </details>
    </div>
  );
};

export default FAQ;

{
  /* <div id="faq-container">
<h1>FAQs</h1>

</div>
<div className="question">
  <h2>How does the lottery work?</h2>
  <p>
    
  </p>
</div>
<div className="question">
  <h2></h2>
  <p>FILL IN ANSWER</p>
</div>
<div className="question">
  <h2></h2>
  <p>
    {" "}
  </p>
</div>
<div className="question">
  <h2></h2>
  <p>
    
  </p>
</div>
<div className="question">
  <h2>
    
  </h2>
  <p>
    
  </p>
</div>

</div> */
}
