module.exports = (io) => {
  // io.use((socket, next) => {
  //   const { userId } = socket.handshake.auth;
  //   if (!userId) {
  //     return next(new Error('invalid userId'));
  //   }
  //   socket.userId = userId;
  //   next();
  // });

  io.on('connection', (socket) => {
    console.log('A new user has connected: ', socket.id);

    socket.on('new message', ({ message }) => {
      socket.broadcast.emit('new message', {
        message,
      });
    });
  });
};
