// server.js

// Base Setup
let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let port = process.env.PORT || 8080

let mongoose = require('mongoose')
let uri = 'mongodb://affinity:company@ds057176.mlab.com:57176/music-manager'
mongoose.connect(uri, {authMechanism: 'ScramSHA1'})
let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('open connection')
  let Bear = require('./app/models/bear')
  let Song = require('./app/models/song')
  let Playlist = require('./app/models/playlist')

  // Setup API Base
  let router = express.Router()

  // router middleware
  router.use(function(req, res, next) {
    console.log('Working...')
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next()
  })

  router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome on the api'})
  })

  // Register Routes

  // Song Routes
  router.route('/songs')
    .post(function(req, res) {
      var song = new Song()

      song.title = req.body.title
      song.artist = req.body.artist
      song.rate = req.body.rate

      song.save(function(err) {
        if (err) res.send(err)
        res.json({ message: 'Song Added' })
      })
    })
    .get(function(req, res) {
      Song.find(function(err, songs) {
        if (err) res.send(err)
        res.json(songs)
      })
    })

  router.route('/song/:song_id')
    .get(function(req, res) {
      Song.findById(req.params.song_id, function(err, song) {
        if (err) res.send(err)
        res.json(song)
      })
    })
    .put(function(req, res) {
      Song.findById(req.params.song_id, function(err, song) {
        if (err) res.send(err)

        //updates
        song.title = req.body.title || song.title
        song.artist = req.body.artist || song.artist
        song.rate = req.body.rate || song.rate

        song.save(function(err) {
          if (err) res.send(err)
          res.json({ message: 'Song updated!' })
        })
      })
    })
    .delete(function(req, res) {
      Song.remove({
        _id: req.params.bear_id
      }, function(err, song) {
        if (err) res.send(err)
        res.json({ message: 'Successfully deleted'})
      })
    })

  // Playlist Routes
  router.route('/playlists')
    .post(function(req, res) {
      var playlist = new Playlist()

      playlist.title = req.body.title

      playlist.save(function(err) {
        if (err) res.send(err)
        res.json({ message: 'Playlist Added' })
      })
    })
    .get(function(req, res) {
      Playlist.find(function(err, playlists) {
        if (err) res.send(err)
        res.json(playlists)
      })
    })

  router.route('/playlist/:playlist_id')
    .get(function(req, res) {
      Playlist.findById(req.params.playlist_id, function(err, playlist) {
        if (err) res.send(err)
        res.json(playlist)
      })
    })
    .put(function(req, res) {
      Playlist.findById(req.params.playlist_id, function(err, playlist) {
        if (err) res.send(err)

        //updates
        playlist.title = req.body.title || playlist.title
        playlist.song_ids = req.body.song_ids || playlist.song_ids

        playlist.save(function(err) {
          if (err) res.send(err)
          res.json({ message: 'Playlist updated!' })
        })
      })
    })
    .delete(function(req, res) {
      Playlist.remove({
        _id: req.params.playlist_id
      }, function(err, playlist) {
        if (err) res.send(err)
        res.json({ message: 'Successfully deleted'})
      })
    })

  router.route('/playlist/:playlist_id/songs')
    .get(function(req, res) {
      Playlist.findById(req.params.playlist_id, function(err, playlist) {
        if (err) res.send(err)
        Song.find({
          "_id": { $in: playlist.song_ids }
        }, function(err, songs) {
          if (err) res.send(err)
          res.json(songs)
        })
      })
    })

  router.route('/playlist/:playlist_id/song/:song_id')
    .post(function(req, res) {
      Playlist.findByIdAndUpdate(
        req.params.playlist_id,{
          $push: { song_ids: req.params.song_id }
        }, function(err, playlist) {
          if (err) res.send(err)
          res.json({ message: 'Successfully added' })
        }
      )
    })
    .delete(function(req, res) {
      Playlist.findByIdAndUpdate(
        req.params.playlist_id,{
          $pull: { song_ids: req.params.song_id }
        }, function(err, playlist) {
          if (err) res.send(err)
          res.json({ message: 'Successfully removed' })
        }
      )
    })

  app.use('/api', router)

  // Start server
  app.listen(port)
  console.log('Magic happens on port ', port)
})
