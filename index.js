'use strict'

const querystring = require('querystring')

// Intel Edison internal ip
const EDISON_IP = '192.168.2.239'

let toQuery = (event) => {
    if (event && event.queryStringParameters)
      delete event.queryStringParameters.state
    return querystring.stringify(event.queryStringParameters)
}

module.exports.handler = (event, context, callback) => Promise.resolve(event)  
  // .then(doStuffWithTheEventObject)
  .then(() => callback(null, {
    statusCode: 302,
    headers: {
      Location: 'http://' + EDISON_IP + ':8080/oauth/google/callback?' + toQuery(event)
    },
  })) // Success!
  .catch(callback);