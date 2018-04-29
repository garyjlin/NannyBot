'use strict';

const express = require( 'express' );
const bodyParser = require( 'body-parser' );

/* Create Express HTTP Server */
const app = express().use( bodyParser.json() );

app.listen( process.env.PORT || 1337, () => console.log( 'Webhook Listening...' ) );

app.post( '/webhook', ( req, res ) => {
  let body = req.body;
  
  if ( body.object === 'page' ) {
    body.entry.forEach( ( entry ) => {
      let webhookEvent = entry.messaging[ 0 ];
      console.log( webhookEvent );
    } );
    res.status( 200 ).send( 'EVENT_RECEIVED' );
  } else {
    res.sendStatus( 404 );
  }
} );

app.get( '/webhook', ( req, res ) => {
  const VERIFICATION_TOKEN = 'ASODF8701823HLI2U5398FIAW4598';
  
  let mode = req.query[ 'hub.mode' ];
  let token = req.query[ 'hub.verify_token' ];
  let challenge = req.query[ 'hub.challenge' ];
  
  if ( mode && token ) {
    if ( mode === 'subscribe' && token === VERIFICATION_TOKEN ) {
      console.log( 'Webhook Verified ' );
      res.status( 200 ).send( challenge );
    } else {
      /* Forbidden */
      res.sendStatus( 403 );
    }
  }
})