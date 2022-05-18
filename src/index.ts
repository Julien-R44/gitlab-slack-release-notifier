import buildServer from './app'
import { Config } from './Config'

/**
 * Start the server and listen on port 3000
 */
const server = buildServer({
  logger: {
    level: 'info',
    prettyPrint: process.env.NODE_ENV === 'development',
  },
})

server.listen(Config.port, Config.address, (err, _address) => {
  if (!err) {
    return
  }

  server.log.error(err)
  process.exit(1)
})
