import kue from 'kue'
import axios from 'axios'

const queue = kue.createQueue()

const getImageUrl = email => {
  const data = {
    contentType: 'image/png',
    email: email
  }

  axios
    .post('URL', data, {
      headers: { Authorization: `Barer: API_KEY` }
    })
    .then(response => {
      console.log('yey 1', response)
      putImage(response.url, email)
    })
}

const putImage = (url, email) => {
  const file = 1

  axios.put(url, file).then(response => {
    console.log('yey 2', response)
  })
}

queue.process('image', (job, done) => {
  done()
})

export const sendImage = (path, email) => {
  queue
    .create('image', {
      path: path,
      email: email
    })
    .attempts(3)
    .save()
}
