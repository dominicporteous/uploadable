const BadRequestError = function (message, meta) {

  return Object.assign(
    new Error(message || 'Bad request'), { statusCode: 400 }, meta
  )

}

export { BadRequestError }
