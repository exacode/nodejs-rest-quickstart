Quickstart RESTful node.js application
======================================

Commands
--------

### Development

During development it is recommended to start two terminals with following commands:

- `grunt dev` - start [nodemon](https://github.com/ChrisWren/grunt-nodemon) with [debugger](https://github.com/ChrisWren/grunt-node-inspector). Debugger is available on: http://localhost:1337/debug?port=5858
- `grunt watch` - runs jshint and unit tests on every file change

### Production

On production environment start application with [supervisor](https://github.com/isaacs/node-supervisor):

- `npm start` - same as `supervisor app/start.js`

### Switching environments

In order to change application environment use:

- Windows: 

		set NODE_ENV=production
		supervisor app/start.js

- Unix/Linux:

		NODE_ENV=production supervisor app/start.js

Functionalities
---------------
- Everything what is needed for advanced rest api: routing, content negotiation, error handling, versioning.
- Configuration per environment
- Logger per environemnt
- Unit tests
- Integration tests

Dependencies
------------

### Runtime modules:

- [Express](http://mcavage.me/node-restify/) - web framework
- [Bunyan](https://github.com/trentm/node-bunyan) - logger
- [Lo-Dash](http://lodash.com/) - utility library

### Testing modules:

- [Mocha](http://mochajs.org/) - test framework
- [Chai](http://chaijs.com/guide/styles/) - assertion mechanisms
- [Sinon](http://sinonjs.org/) - mocking framework
- [Blanket](http://blanketjs.org/) - code coverage
- [Supertest](https://github.com/visionmedia/supertest) - HTTP assertions designed for express - useful for integration tests
