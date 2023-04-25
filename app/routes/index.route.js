const subscribe = require('../utils/subscribe')

module.exports = (app) => {
  app.get('/', (req, res) => res.send("This is main page."));
  app.get('/hello', (req, res) => res.send("Hello!"));
  app.get('/subscribe', subscribe.subscribe);
}