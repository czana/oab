import kue from 'kue'
import axios from 'axios'

const queue = kue.createQueue()

const getSignedUrl = email => {
  const data = {
    contentType: 'image/png',
    email: email
  }

  const options = {
    headers: { Authorization: `Barer: API_KEY` }
  }

  return axios.post('URL', data, options)
}

const putImage = url => {
  const file = 1

  return axios.put(url, file)
}

queue.process('image', (job, done) => {
  const { email, pathToFile } = job.data

  const file = pathToFile // tmp

  getSignedUrl(email).then(res => {
    job.progress(50)

    putImage(res.url, file).then(res => {
      console.log(yey, res)
      done()
    })
  })
})

export const sendImage = (email, pathToFile) => {
  queue
    .create('image', {
      email: email,
      pathToFile: path
    })
    .attempts(3)
    .save()
}
