var http = require('http')
var config = require('config')
var PORT = config.get('port')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: config.get('path'), secret: config.get('secret') })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    if (err) return console.error(err)
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(PORT)

console.info('>> Listening on port', PORT)

handler.on('error', function (err) {
  console.error('!! Error:', err.message)
})

handler.on('push', function (event) {
  console.log('   Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  console.log(event)
})
