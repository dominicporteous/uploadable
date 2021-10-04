import 'dotenv/config'
import { logger } from 'serve'
import { start } from '../src/server'

start()
  .catch((error) => {

    logger.error('Startup error', { error })

    process.exit(1)

  })
