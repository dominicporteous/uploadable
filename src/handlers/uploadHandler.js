import { componentLogger } from 'serve'
import { withResponse } from 'serve/middleware'
import { createReadStream, promises as fs } from 'fs'
import ft from 'file-type'
import mimes from 'video-extensions'
import * as uuid from 'uuid'
import config from '../lib/config'
import { uploadFile } from '../providers/s3'
import { BadRequestError } from '../providers/error'

const logger = componentLogger({ subcomponent: 'handler', handler: 'upload' })

export default () => withResponse(async ({ upload }) => {

  logger.info('Processing file upload', { file: upload.name })

  const body = await fs.readFile(upload.path)
  const metadata = await ft.fromStream(createReadStream(upload.path))
  const isVideoFile = mimes.includes(metadata.ext) || metadata.mime.startsWith('video/')

  if (!isVideoFile) {

    throw new BadRequestError()

  }

  const endpoint = `${config.SPACES_ENDPOINT}/${config.SPACES_BUCKET}`
  const path = `${uuid.v4()}.${metadata.ext}`
  const uri = `${endpoint}/${path}`

  await uploadFile(
    path, metadata.mime, body
  )

  logger.info('Processed file upload', { file: upload.name, uri })

  return { endpoint, path, uri }

})
