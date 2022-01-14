const { DataStorage } = require('./GoogleCloudStorage')
const { Validator } = require('./Validator')

const createRequest = async (input, callback) => {
  console.log("INPUT", JSON.stringify(input));
  let validatedInput
  try {
    validatedInput = Validator.validateInput(input)
  } catch (error) {
    callback(500,
      {
        status: 'Errored',
        statusCode: 500,
        error: {
          name: 'Validation Error',
          message: 'Error validating Input: ' + error.message
        }
      })
    return
  }
  const storage = new DataStorage();
  try {
    await storage.uploadData(validatedInput)
  } catch (error) {
    callback(500,
      {
        status: 'Errored',
        statusCode: 500,
        error: {
          name: 'Google Cloud Storage Upload Error',
          message: 'Google Cloud Storage Upload Error: ' + error.message
        }
      })
    return
  }
  callback(200, {
    status: 'Success',
    statusCode: 200
  })
}

// Export for testing with express
module.exports.createRequest = createRequest

// Export for GCP Functions deployment
exports.gcpservice = async (req, res) => {
  // set JSON content type and CORS headers for the response
  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  // respond to CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    res.status(204).send('')
  } else {
    for (const key in req.query) {
      req.body[key] = req.query[key]
    }
    try {
      await createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
}