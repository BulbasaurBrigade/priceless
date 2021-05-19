/* eslint-disable no-console */
import { io } from 'socket.io-client';

const socket = io();

// debugging func to log all events received by client
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;
