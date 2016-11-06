#ReadMe
## Music Manager Api

**Music Manager Api** is meant to provide a simplistic api for retrieving and arranging songs and playlists with ratings from 1 to 10. 

Endpoints include:

### Song routes
1. POST '/songs'
 - Add songs to the db
 - req.body can include: title, artist, and rate
2. GET '/songs'
 - Retrieve all songs from the db
3. GET '/song/:song_id'
 - Retrieve a song by song_id
4. PUT '/song/:song_id'
 - Update song by song_id
5. DELETE '/song/:song_id'
 - Remove song with song_id from db

### Playlist routes
1. POST '/playlists'
 - Add empty playlist to db
 - req.body can include: title
2. GET '/playlists'
 - Retrieve all playlists from the db
3. GET '/playlist/:playlist_id'
 - Retrieve playlist with playlist_id
4. PUT '/playlist/:playlist_id'
 - Modify/Update playlist with playlist_id
5. DELETE 'playlist/:playlist_id'
 - Remove playlist from db
6. GET '/playlist/:playlist_id/songs'
 - Retrieve all songs associated with playlist with playlist_id
7. POST '/playlist/:playlist_id/song/:song_id'
 - Modify playlist with playlist_id to include song with sond_id
8. DELETE '/playlist/:playlist_id/song/:song_id'
 - Remove song with song_id from playlist with playlist_id


