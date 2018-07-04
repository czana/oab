import kue from 'kue'

const queue = kue.createQueue()

queue.process('image', (job, done) => {
  setTimeout(() => {
    console.log('done', job.data)
    done()
  }, 2000)
})

export const sendImage = (path, email) => {
  queue
    .create('image', {
      path: path,
      email: email
    })
    .save()
}
