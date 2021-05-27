import React from "react";
import Countdown from "react-countdown";
import moment from "moment";

const CountdownClock = (props) => {
  console.log(props.createdAt);
  const createdTime = new Date(props.createdAt);
  const lotteryTime = moment(createdTime).add(1, "day").toDate();
  console.log(lotteryTime);
  return (
    <div id="countdown-wrapper">
      <h4>
        Time remaining until lottery drawing:{"  "}
        <span>
          <Countdown date={lotteryTime} zeroPadDays={2} daysInHours></Countdown>
        </span>
      </h4>
    </div>
  );
};

export default CountdownClock;
