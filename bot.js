'use strict'

const config = require('./config.js')
const Twit = require('twit')
const Twitter = new Twit(config)

const stream = Twitter.stream('user')

// when someone follows
stream.on('follow', followed)

const quotes = [
  'Thank you for the follow up. High five!', 
  'Thanks for connecting', 
  'Thank for connect with me', 
  'Welcome my new follower', 
  'So, how did you get here?'
]

function rand(xs) {
  return xs.slice(0).sort(function () {
    return .5 - Math.random()
  })
}

function txt(q) {
  return q[0]
}

// trigger the callback
function followed (event) {
  console.log('Follow Event is running')
  let screenName = event.source.screen_name
  tweetNow(`.@${screenName} ${rand(txts).map(txt)[0]} #bot`)
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
