import kue from 'kue'
import axios from 'axios'

const queue = kue.createQueue()

export const getSignedUrl = email => {
  const data = {
    contentType: 'image/png',
    email: email
  }

  const options = {
    headers: { Authorization: `Barer 697b98da8795cec063839b96b6d125e5` }
  }

  return axios.post('http://50-faces-of-selleo-dev.eu-west-1.elasticbeanstalk.com/reference-images/sign', data, options)
}

export const putImage = (url, file) => {
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
