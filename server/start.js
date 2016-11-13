'use strict';

const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const {resolve} = require('path')

const pkg = require('APP');
const app = express();

// do i need to use volleyball only if pkg is in dev only?

app
	.use(volleyball)
	.use(bodyParser.urlencoded({ extended: true }))
  	.use(bodyParser.json())

  	 // Serve static files from ../public
  	.use(express.static(resolve(__dirname, '..', 'public')))

	  // Serve our api
	  .use('/api', require('./api'))

	  // Send index.html for anything else.
	  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')));

const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )

module.exports = app;