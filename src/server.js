import { createApp } from 'serve'
import { healthcheckMiddleware } from 'serve/healthchecks'

import apiRouter from './routers/api'

const server = createApp({ apm: false })

server.use(healthcheckMiddleware())

server.use(apiRouter.mount())

const start = () => {

  const port = process.env.PORT || 3000

  return server.listen(port)

}

export { start }
