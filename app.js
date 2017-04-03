'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
module.exports = app; // for testing

const jwt = require('./api/helpers/jwt.js');

const config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    UserSecurity: function (req, authOrSecDef, scopesOrApiKey, cb) {
      jwt.verifyToken(scopesOrApiKey)
        .then(decoded => {
          req.jwt = {
            username: decoded.username
          };
          cb(null);
        })
        .catch(cb);
    }
  }
};

/** DB */
const db = require('./models/db.js');
db.connect().then(() => {
  console.log('db connected')
},
e => console.log(e));

/** Error handler */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server error.');
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
