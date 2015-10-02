var yelp = require('yelp');

module.exports = yelp.createClient({
  consumer_key: "consumer-key",
  consumer_secret: "consumer-secret",
  token: "token",
  token_secret: "token-secret"
});
