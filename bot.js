'use strict'

const config = require('./config.js')
const Twit = require('twit')
const Twitter = new Twit(config)

const stream = Twitter.stream('user')

// when someone follows
stream.on('follow', followed)

// trigger the callback
function followed (event) {
  console.log('Follow Event is running')
  let screenName = event.source.screen_name
  tweetNow(`.@${screenName} Thank you for the follow up. High five! #bot`)
}

// function definition to tweet back to user who followed
function tweetNow (tweetTxt) {
  var tweet = {
    status: tweetTxt
  }
  Twitter.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.log('Error in Replying')
    } else {
      console.log('Gratitude shown successfully')
    }
  })
}
