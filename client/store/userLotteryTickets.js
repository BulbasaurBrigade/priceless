import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { ADD_REQUESTER } from './singlePost';

//action type
const GET_USER_LOTTERYTICKETS = 'SET_USER_LOTTERYTICKETS';

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
      const token = await getAuth().currentUser.getIdToken();
      const { data } = await axios.get(`/api/users/${userId}/lotteryTickets`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_getUserLotteryTickets(data));
    } catch (error) {
      console.log('error fetching userLotteryTickets via thunk', error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case ADD_REQUESTER:
      return [...state, { id: action.post.id }];
    case GET_USER_LOTTERYTICKETS:
      return action.tickets;
    default:
      return state;
  }
};
