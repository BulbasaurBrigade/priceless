import axios from "axios";

//action type
const GET_USER_LOTTERYTICKETS = "SET_USER_LOTTERYTICKETS";

//action creator
export const _getUserLotteryTickets = (tickets) => {
  return {
    type: GET_USER_LOTTERYTICKETS,
    tickets,
  };
};

//thunk creator
export const getUserLotteryTickets = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/lotteryTickets`);
      dispatch(_getUserLotteryTickets(data));
    } catch (error) {
      console.log("error fetching userLotteryTickets via thunk", error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_USER_LOTTERYTICKETS:
      return action.tickets;
    default:
      return state;
  }
};
