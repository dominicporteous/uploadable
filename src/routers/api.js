import { createRouter } from 'serve'
import { withRequest, withResponse } from 'serve/middleware'
import { validateJwtMiddleware } from '../providers/jwt'
import uploadHandler from '../handlers/uploadHandler'

const apiRouter = createRouter('/api/v1')

apiRouter.get(
  '/me', withRequest(), validateJwtMiddleware(), withResponse(({ user }) => ({ user }))
)

apiRouter.post(
  '/upload', withRequest(), validateJwtMiddleware(), uploadHandler()
)

export default apiRouter
