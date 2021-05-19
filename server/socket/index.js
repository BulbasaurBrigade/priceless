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
      console.log('message', message);
      socket.to(String(message.chatId)).emit('new message', {
        message,
      });
    });

    socket.on('updated chat', ({ chat }) => {
      socket.broadcast.emit('updated chat', { chat });
    });

    socket.on('leave room', ({ room }) => {
      console.log('socket.rooms before leave room', socket.rooms);
      socket.leave(room);
    });

    socket.on('join room', ({ room }) => {
      socket.join(room);
      console.log('socket.rooms in join room', socket.rooms);
    });
  });
};
