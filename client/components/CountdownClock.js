import React from "react";
import Countdown from "react-countdown";
import moment from "moment";

const CountdownClock = (props) => {
  const createdTime = new Date(props.createdAt);
  const lotteryTime = moment(createdTime).add(2, "m").toDate();
  return (
    <div id="countdown-wrapper">
      <h4>
        Time remaining until lottery drawing:{"  "}
        <span>
          <Countdown date={lotteryTime} daysInHours></Countdown>
        </span>
      </h4>
    </div>
  );
};

export default CountdownClock;
