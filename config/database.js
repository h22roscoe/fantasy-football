const IP = process.env.IP;

module.exports = {
  development: {
    uri: 'mongodb://' + IP + '/icff-test'
  },
  production: {
    uri: 'mongodb://anotherHost:anotherPort/icff-dev'
  },
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
};
