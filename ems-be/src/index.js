/* eslint-disable no-console */
var errorHandler = require('errorhandler');
var app = require('./app');

/**
 * Error Handler. Provides full stack - remove for production
 */
var NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== 'production') {
  app.use(errorHandler());
}


/**
 * Start Express server.
 */
var server = app.listen(app.get('port'), function () {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = server;
