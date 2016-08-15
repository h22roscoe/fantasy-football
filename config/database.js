module.exports = {
  development: {
    uri: 'mongodb://localhost/icff-test'
  },
  production: {
    uri: 'mongodb://anotherHost/icff-dev'
  },
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
};
