const IP = process.env.IP;

module.exports = {
  development: {
    uri: 'mongodb://' + IP + '/icff-test'
  },
  production: {
    uri: 'mongodb://ds021016.mlab.com:21016/heroku_5b6nh0mk'
  },
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
};
