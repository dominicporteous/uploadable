import { logger } from 'serve'
import { types } from 'modeller'

const configO = {
  JWT_SECRET: types.STRING.required(),
  JWT_ISSUER: types.STRING.default('uploadable.dev'),
  SPACES_KEY: types.STRING.required(),
  SPACES_SECRET: types.STRING.required(),
  SPACES_ENDPOINT: types.STRING.required(),
  SPACES_BUCKET: types.STRING.required(),
  DISCORD_CLIENT_ID: types.STRING.required(),
  DISCORD_CLIENT_SECRET: types.STRING.required(),
  DISCORD_CALLBACK_URL: types.STRING.required()
}

const configSchema = types.SCHEMA(configO)

const config = Object.keys(configO).reduce((acc, k) => Object.assign(acc, { [k]: process.env[k] || '' }), {})
const parsed = configSchema.validate(config)

if (parsed.error) {

  logger.error('Config error', parsed.error)

  process.exit(1)

}

export default parsed.value
