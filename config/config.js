module.exports = {
  url: 'http: //localhost',
  port: process.env.PORT || 3030,
  originUrl: 'http://localhost:3030',
  mongoUrl: 'mongodb://mongo1:27017/chat-app?replicaSet=rs0',
  ISDEV: process.env.NODE_ENV !== 'production',
  emailer: {
    from: "Chat App <no-reply@chatapp.com>",
    transport: {
      service: 'gmail',
      auth: {
        user: 'lol@lol.com',
        pass: 'kek'
      }
    }
  }
}
