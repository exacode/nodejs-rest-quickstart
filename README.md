# Quickstart RESTful node.js application

This is simple RESTful node.js application.
Built to let you kick off with your project quickly.

Functionality:
- Everything what is needed for advanced rest api: routing, content negotiation, error handling.
- Configuration per environment
- Logger per environemnt
- Unit tests
- Integration tests (to do)

## Runtime modules:

### [Lo-Dash](http://lodash.com/)

JS utility library. Contains endless utility functions that ease the development process.
(It's like apache-commons/guava for Java)

### [Express](http://mcavage.me/node-restify/)

Express widely used web framework for NodeJS. 
It's fast and flexible.

### [Bunyan](https://github.com/trentm/node-bunyan)

Logger for node.js that logs in JSON format.
Don't worry you can create a [pretty stream](https://github.com/mrrama/node-bunyan-prettystream) to console. 
It integrates nicely wirh restify.
More description: http://blog.nodejs.org/2012/03/28/service-logging-in-json-with-bunyan/

## Testing modules:

### [Mocha](http://visionmedia.github.io/mocha/)

Lightweight and flexible test framework.
Especiallly good for nodejs applications because it doesn't come with unnecessary browser testing mechanisms.

### [Chai](http://chaijs.com/guide/styles/)

Contains all assertion mechanisms (assert, expect, should)

### [Sinon](http://sinonjs.org/)

Mocking framework for JavaScript.

### [Blanket](http://blanketjs.org/)

Most code coverage tools are system specific - you have to install them on your system (`sudo apt-get install jscoverage`).
Blanket is code coverage tool built on nodejs. 
