import buildServer from './app'

/**
 * Start the server and listen on port 3000
 */
const server = buildServer({
  logger: {
    level: 'info',
    prettyPrint: process.env.NODE_ENV === 'development',
  },
})

server.listen(3000, (err, _address) => {
  if (!err) {
    return
  }

  server.log.error(err)
  process.exit(1)
})
