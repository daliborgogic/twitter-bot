'use strict'

const config = require('./config.js')
const Twit = require('twit')
const Twitter = new Twit(config)

const stream = Twitter.stream('user')

// when someone follows
stream.on('follow', followed)

const txts = [
  'Thank you for the follow up. High five!', 
  'Thanks for connecting', 
  'Thanks for connect with me', 
  'Welcome my new follower', 
  'So, how did you get here?'
]

// trigger the callback
function followed (event) {
  let randomTxts = Math.floor(Math.random() * (txts.length))
  console.log('Follow Event is running')
  let screenName = event.source.screen_name
  if (screenName != process.env.SCREEN_NAME) {
    tweetNow(`.@${screenName} ${txts[randomTxts]} #bot`)
  }
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

const retweet = () => {  
  let params = {
    q: '#nodejs, #Nodejs',  
    result_type: 'popular',
    lang: 'en'
  }

  // more parameters https://dev.twitter.com/rest/reference/get/search/tweets
  Twitter.get('search/tweets', params, (err, data) => {
    if (!err) {
      let retweetId = data.statuses[0].id_str
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, (err, res) => {
        if (res) {
          console.log('Retweeted!!!')
        }
        if (err) {
          console.error('Something went wrong while RETWEETING... Duplication maybe...')
        }
      })
    } else {
      console.error('Something went wrong while SEARCHING...')
    }
  })
}

// grab & retweet as soon as program is running...
retweet()

// retweet in every 6h
setInterval(retweet, 1000 * 60 * 60 * 6 )
