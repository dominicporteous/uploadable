import { componentLogger } from 'serve'
import aws from 'aws-sdk'
import config from '../lib/config'

const s3Logger = componentLogger({ subcomponent: 's3uploader' })

const spacesEndpoint = new aws.Endpoint(config.SPACES_ENDPOINT)

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: config.SPACES_KEY,
  secretAccessKey: config.SPACES_SECRET
})

const uploadFile = async (
  fileName, contentType, body
) => {

  const put = {
    ACL: 'public-read',
    Bucket: config.SPACES_BUCKET,
    Key: fileName,
    ContentType: contentType,
    Body: body
  }

  const upload = s3.upload(put)

  s3Logger.debug('Upload starting', { fileName, contentType })

  upload.on('httpUploadProgress', ({ part, key }) => {

    s3Logger.debug('Upload tick', { part, key })

  })

  const res = await upload.promise()

  s3Logger.debug('Upload complete', res)

  return res

}

export default s3

export { uploadFile }
