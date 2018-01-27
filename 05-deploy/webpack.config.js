/**
 *  Environment based webpack config
 */
switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'development':
    module.exports = require('./config/webpack.dev')({env: 'development'});
    break;
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'});
}
