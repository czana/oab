import PiCamera from 'pi-camera'

const camera = new PiCamera({
  mode: 'photo',
  output: `./images/test.png`,
  width: 1280,
  height: 720,
  nopreview: true,
  encoding: 'png'
})

camera.snap().then(result => {
  console.log(result)
})
