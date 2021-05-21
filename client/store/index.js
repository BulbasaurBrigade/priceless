import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import posts from './posts';
import chats from './chats';
import messages from './messages';
import singlePost from './singlePost';
import singleChat from './singleChat';
import location from './location';
import userLotteryTickets from './userLotteryTickets';
import userPosts from './userPosts';
import postFilters from './postFilters';
import loading from './loading';
import error from './error';

const reducer = combineReducers({
  auth,
  posts,
  chats,
  messages,
  singlePost,
  singleChat,
  location,
  userLotteryTickets,
  userPosts,
  postFilters,
  loading,
  error,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
