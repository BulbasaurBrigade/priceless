module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A new user has connected: ', socket.id);

    // listener for when a client emits a new message out
    socket.on('new message', ({ message }) => {
      // Server will emit that message to anyone in that specific room, based on chat IDs
      socket.to(String(message.chatId)).emit('new message', {
        message,
      });
    });

    // listener for when a chat status has updated
    socket.on('updated chat', ({ chat }) => {
      socket.broadcast.emit('updated chat', { chat });
    });

    // Allows users to leave socket rooms for specific chats
    socket.on('leave room', ({ room }) => {
      socket.leave(room);
    });

    // Allows users to join socket rooms for specific chats
    socket.on('join room', ({ room }) => {
      socket.join(room);
    });
  });
};
