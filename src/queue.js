import axios from 'axios'
import { fileDir } from './camera'
import fs from 'fs'
import kue from 'kue'

const queue = kue.createQueue()

const getSignedUrl = email => {
  const data = {
    contentType: 'image/png',
    email: email
  }

  const options = {
    headers: { Authorization: `Barer 697b98da8795cec063839b96b6d125e5` }
  }

  return axios.post(
    'http://50-faces-of-selleo-dev.eu-west-1.elasticbeanstalk.com/reference-images/sign',
    data,
    options
  )
}

const putImage = (url, file) => {
  return axios.put(url, file)
}

queue.process('image', (job, done) => {
  const { email, id } = job.data

  getSignedUrl(email).then(res => {
    console.log('signed', res.status)

    if (res.status === 200) {
      const binary = fs.readFileSync(fileDir() + `/${id}.png`)

      putImage(res.data.url, binary).then(res => {
        console.log('put', res.status)
        done()
      })
    }
  })
})

export default (email, id) => {
  queue
    .create('image', {
      email: email,
      id: id
    })
    .attempts(3)
    .save()
}
