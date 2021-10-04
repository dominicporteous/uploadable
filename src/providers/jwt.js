import { logger } from 'serve'
import { extractToken } from 'serve/middleware'
import jwt from 'jsonwebtoken'
import compose from 'koa-compose'
import config from '../lib/config'

const generateJwtToken = (payload, opts) => {

  opts = Object.assign({ issuer: config.JWT_ISSUER, expiresIn: '1h' }, opts || {})

  return new Promise((resolve, reject) => {

    setImmediate(() => {

      jwt.sign(
        payload, opts.secret || config.JWT_SECRET, opts, (err, token) => {

          if (err) {

            return reject(err)

          }

          resolve(token)

        }
      )

    })

  })

}

const verifyJwtToken = (token, opts) => {

  opts = Object.assign({ issuer: config.JWT_ISSUER }, opts || {})

  return new Promise((resolve, reject) => {

    setImmediate(() => {

      jwt.verify(
        token, opts.secret || config.JWT_SECRET, opts, (err, payload) => {

          if (err) {

            return reject(err)

          }

          resolve(payload)

        }
      )

    })

  })

}

const validateJwtMiddleware = (opts) => {

  opts = opts || {}

  const getUserFromToken = async (token) => {

    const claims = await verifyJwtToken(token, opts)
    const user = { id: claims.sub }

    return { user, claims }

  }

  return compose([
    extractToken({ getUserFromToken }),
    (ctx, next) => {

      if (!ctx.user) {

        const requestId = ctx.requestId

        logger.debug('User not authenticated', { requestId })

        throw Object.assign(new Error('Not authenticated'), { name: 'AuthenticationError', statusCode: 401 })

      }

      return next()

    }
  ])

}

export {
  generateJwtToken,
  validateJwtMiddleware
}
