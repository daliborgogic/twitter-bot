'use strict'

const config = require('./config.js')
const Twit = require('twit')
const Twitter = new Twit(config)

const stream = Twitter.stream('user')

// when someone follows
stream.on('follow', followed)

let txts = [
  'Thank you for the follow up. High five!', 
  'Thanks for connecting', 
  'Thank for connect with me', 
  'Welcome my new follower', 
  'So, how did you get here?'
]

// trigger the callback
function followed (event) {
  let randomTxts = Math.floor(Math.random() * (txts.length))
  console.log('Follow Event is running')
  let screenName = event.source.screen_name
  tweetNow(`.@${screenName} ${txts[randomTxts]} #bot`)
}

// function definition to tweet back to user who followed
function tweetNow (tweetTxt) {
  let tweet = {
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
